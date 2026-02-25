import {
    template,
    types,
    operator,
} from 'putout';

const {
    replaceWithMultiple,
    rename,
    traverse,
    compare,
} = operator;

const {
    expressionStatement,
    isReturnStatement,
    isLabeledStatement,
    blockStatement,
} = types;

const isEax = (name) => /[re]?a[xl]/.test(name);

const createExpression = (a) => {
    return expressionStatement(template.ast(a));
};

export const report = () => `Use 'regs' instead of 'args'`;

export const match = () => ({
    'async function __a(__args) {__body}': ({__args}, path) => {
        const {returnType} = path.node;
        
        if (returnType && returnType.typeAnnotation.typeName.name === 'ureg')
            return false;
        
        return __args.length;
    },
});

export const replace = () => ({
    'async function __a(__args) {__body}': ({__body, __args}, path) => {
        const bytes = getBytes(path);
        const startCount = 2;
        
        const ebp = getRegister(path, 'ebp');
        const esp = getRegister(path, 'esp');
        
        __body.body.unshift(...[
            createExpression(`push(${ebp})`),
            createExpression(`mov(${ebp}, ${esp})`),
        ]);
        
        insertReturnAtEnd(ebp, __body);
        
        const params = path.get('params');
        
        for (const [i, param] of params.entries()) {
            const arg = param.node;
            const {name} = getType(arg);
            
            rename(path, arg.name, `[${ebp} + ${bytes * (i + startCount)}]`);
            param.__nirguna_type = name;
        }
        
        const argsSize = bytes * __args.length;
        
        path.__nirguna_args_size = argsSize;
        path.node.params = [];
        
        const replaceReturn = createReplaceReturn(path, argsSize);
        
        traverse(path, {
            'ReturnStatement': replaceReturn,
            'ret()': replaceReturn,
        });
        
        delete path.node.returnType;
        
        return path;
    },
});

const TARGET = {
    linux: {
        size: 8,
        bits: 'i64',
    },
    kernel: {
        size: 2,
        bits: 'i16',
    },
    boot: {
        size: 2,
        bits: 'i16',
    },
    nemesis: {
        size: 2,
        bits: 'i16',
    },
};

const REG = {
    i16: {
        eax: 'ax',
        ebp: 'bp',
        esp: 'sp',
    },
    i32: {
        eax: 'eax',
        ebp: 'ebp',
        esp: 'esp',
    },
    i64: {
        eax: 'rax',
        ebp: 'rbp',
        esp: 'rsp',
    },
};

const BYTES = {
    i16: 2,
    i32: 4,
    i64: 8,
};

function getTarget({scope}) {
    const programPath = scope.getProgramParent().path;
    const {target} = programPath.node.extra;
    
    return target;
}

function getBytes(path) {
    const target = getTarget(path);
    
    if (target)
        return TARGET[target].size;
    
    const {returnType} = path.node;
    
    if (!returnType)
        return 2;
    
    const {name} = path.node.returnType.typeAnnotation.typeName;
    
    return BYTES[name];
}

function getRegister(path, reg) {
    const target = getTarget(path);
    
    if (target) {
        const {bits} = TARGET[target];
        
        return REG[bits][reg];
    }
    
    const {returnType} = path.node;
    
    if (!returnType)
        return REG.i16[reg];
    
    const {name} = path.node.returnType.typeAnnotation.typeName;
    
    return REG[name][reg];
}

function getType({typeAnnotation}) {
    if (!typeAnnotation)
        return 'i16';
    
    return typeAnnotation.typeAnnotation.typeName.name;
}

const createReplaceReturn = (fnPath, argsSize) => (path) => {
    const statements = [
        expressionStatement(template.ast(`pop(${getRegister(fnPath, 'ebp')})`)),
        expressionStatement(template.ast(`ret(${argsSize})`)),
    ];
    
    const argPath = path.get('argument');
    const arg = argPath.node;
    
    if (arg && !isEax(arg.name)) {
        const expression = template.ast(`${getRegister(fnPath, 'eax')} = ${argPath}`);
        statements.unshift(expressionStatement(expression));
    }
    
    if (path.parentPath.isLabeledStatement()) {
        path.parentPath.node.body = blockStatement(statements);
        return;
    }
    
    replaceWithMultiple(path, statements);
};

function insertReturnAtEnd(ebp, __body) {
    const last = __body.body.at(-1);
    
    if (isReturnStatement(last) || isLabeledStatement(last))
        return;
    
    const popEBP = createExpression(`pop(${ebp})`);
    
    if (compare(last, 'ret()'))
        __body.body.splice(-1, 0, popEBP);
    else
        __body.body.push(popEBP);
}
