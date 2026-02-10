import {types, operator} from 'putout';

const {compare} = operator;
const {
    isCallExpression,
    isReturnStatement,
    expressionStatement,
    identifier,
    arrayExpression,
    callExpression,
    isExportNamedDeclaration,
    numericLiteral,
} = types;

export const report = () => `Use 'label' instead of 'function'`;

export const filter = (path) => {
    if (isExportNamedDeclaration(path.parentPath))
        return false;
    
    if (path.node.params.length)
        return false;
    
    const {returnType} = path.node;
    
    if (returnType && returnType.typeAnnotation.typeName.name !== 'iret')
        return false;
    
    const last = path.node.body.body.at(-1);
    
    return !(isCallExpression(last) && last.callee.name === 'ret');
};

export const replace = () => ({
    'async function __a<__type_params>(__args): __b {__body}': convertFnToLabel(),
    'function __a<__type_params>(__args): __b {__body}': convertFnToLabel(),
    'function __a(__args): __b {__body}': convertFnToLabel(),
    'async function __a(__args): __b {__body}': convertFnToLabel(),
    'async function __a<__type_params>(__args) {__body}': convertFnToLabel('ret'),
    'function __a<__type_params>(__args) {__body}': convertFnToLabel('ret'),
    'function __a(__args) {__body}': convertFnToLabel('ret'),
    'async function __a(__args) {__body}': convertFnToLabel('ret'),
});

const convertFnToLabel = (ret) => ({__b, __type_params, __body}, path) => {
    addStackOperations({
        __type_params,
        __body,
    });
    
    if (__b)
        path.traverse({
            ReturnStatement(path) {
                path.replaceWithSourceString('iret()');
            },
        });
    
    const last = __body.body.at(-1);
    
    if (!compare(last, 'ret()')) {
        const iret = expressionStatement(maybeRet(ret, path) || callExpression(__b.typeName, []));
        __body.body.push(iret);
    }
    
    return '__a: __body';
};

const maybeRet = (name, path) => {
    if (!name)
        return false;
    
    const count = path.__nirguna_args_size;
    const args = [];
    
    if (count)
        args.push(numericLiteral(count));
    
    return callExpression(identifier(name), args);
};

function addStackOperations({__body, __type_params = []}) {
    const args = [];
    
    for (const {name} of __type_params) {
        args.push(name);
    }
    
    if (!args.length)
        return;
    
    const push = createStackOperation('push', args);
    
    const pop = createStackOperation('pop', args
        .slice()
        .reverse());
    
    __body.body.unshift(push);
    
    const last = __body.body.at(-1);
    
    if (isReturnStatement(last))
        __body.body.splice(-1, 1, pop, last);
    else
        __body.body.push(pop);
}

function createStackOperation(name, args) {
    const callee = identifier(name);
    const params = [
        arrayExpression(args),
    ];
    
    return expressionStatement(callExpression(callee, params));
}
