import {types, operator} from 'putout';

const isString = (a) => typeof a === 'string';
const {
    isTSStringKeyword,
    isExportNamedDeclaration,
    isFunction,
    isProgram,
    isStringLiteral,
} = types;

const {extract} = operator;

const TYPES = {
    i8: 'db',
    i16: 'dw',
    i32: 'dd',
    i64: 'dq',
    rb: 'rb',
};

export const report = () => `Use 'db' instead of 'i8'`;

export const filter = (path) => {
    if (!isProgram(path.parentPath))
        return;
    
    const {init} = path.node.declarations[0];
    
    if (isFunction(init))
        return false;
    
    return !isExportNamedDeclaration(path.parentPath);
};

export const replace = () => ({
    'let __a = __array': (vars, path) => {
        const values = [];
        const elementsPath = path.get('declarations.0.init');
        
        for (const element of elementsPath.get('elements')) {
            if (isStringLiteral(element)) {
                values.push(element.node.raw);
                continue;
            }
            
            const value = extract(element);
            
            if (isString(value)) {
                const escaped = value.replaceAll(`'`, `\\'`);
                values.push(`'${escaped}'`);
                continue;
            }
            
            values.push(value);
        }
        
        return `__a.db = ${values.join(',')}, 0`;
    },
    'let __a: __b = __c': convert,
    'let __a = __c': convert,
});

function convert({__b, __c}) {
    if (!__b && isString(__c.value))
        return '__a.db = __c, 0';
    
    if (!__b)
        return '__a.db = __c';
    
    if (isTSStringKeyword(__b))
        return '__a.db = __c, 0';
    
    const {name} = __b.typeName;
    const type = TYPES[name];
    
    return `__a.${type} = __c`;
}

