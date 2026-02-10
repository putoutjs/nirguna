import {types} from 'putout';

const {isFunction} = types;
const i16 = [
    'ax',
    'bx',
    'cx',
    'dx',
    'di',
    'si',
];

export const report = () => `Use 'eax' instead of 'return'`;

export const replace = () => ({
    'return': 'ret()',
    'return __a': ({__a}, path) => {
        if (i16.includes(__a.name))
            return `{
                ax = __a;
                ret();
            }`;
        
        const fnPath = path.find(isFunction);
        
        if (fnPath) {
            const {returnType} = fnPath.node;
            
            if (!fnPath.node.params.length)
                delete fnPath.node.returnType;
            
            const name = parseType(fnPath, returnType);
            
            const reg = getReg(name);
            
            return `{
                ${reg} = __a;
                ret();
            }`;
        }
        
        return `{
            ax = __a;
            ret();
        }`;
    },
});

function parseType(path, returnType) {
    const {__nirguna_return_type} = path;
    
    if (__nirguna_return_type)
        return __nirguna_return_type;
    
    if (!returnType)
        return '';
    
    const {name} = returnType.typeAnnotation.typeName;
    
    path.__nirguna_return_type = name;
    
    return name;
}

function getReg(name) {
    if (name === 'i8')
        return 'al';
    
    if (name === 'i32')
        return 'eax';
    
    if (name === 'i64')
        return 'rax';
    
    return 'ax';
}
