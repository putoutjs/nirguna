import {
    template,
    types,
    operator,
} from 'putout';

const {
    getTemplateValues,
    replaceWith,
} = operator;

const {
    isIdentifier,
    isIfStatement,
    isCallExpression,
} = types;

const i32 = 'i32.__(__a, __b)';

export const report = () => `Use 'local.get()'`;

export const fix = (path) => {
    if (isIfStatement(path)) {
        const testPath = path.get('test');
        const {name} = testPath.node;
        
        const localGet = template.ast(`local.get(${name})`);
        replaceWith(testPath, localGet);
        
        return;
    }
    
    if (isCallExpression(path)) {
        const [first, second] = path.get('arguments');
        
        if (isIdentifier(first)) {
            const localGet = template.ast(`local.get(${first.node.name})`);
            replaceWith(first, localGet);
            
            return;
        }
        
        const localGet = template.ast(`local.get(${second.node.name})`);
        replaceWith(second, localGet);
    }
};

export const traverse = ({push}) => ({
    'if (__a) __b': (path) => {
        const {__a} = getTemplateValues(path, 'if (__a) __b');
        
        if (!isIdentifier(__a))
            return;
        
        push(path);
    },
    [i32]: (path) => {
        const {__a, __b} = getTemplateValues(path, i32);
        
        if (!isIdentifier(__a) && !isIdentifier(__b))
            return;
        
        push(path);
    },
});
