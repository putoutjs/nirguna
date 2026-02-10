import {operator, types} from 'putout';

const {
    isNumericLiteral,
    isExpressionStatement,
    isCallExpression,
} = types;

const {
    remove,
    compare,
    getTemplateValues,
    extract,
} = operator;

const NEXT_REG = {
    al: 'ah',
    ah: 'al',
    bl: 'bh',
    bh: 'bl',
    cl: 'ch',
    ch: 'cl',
    dl: 'dh',
    dh: 'dl',
};

const REG = {
    al: 'ax',
    ah: 'ax',
    bl: 'bx',
    bh: 'bx',
    cl: 'cx',
    ch: 'cx',
    dl: 'dx',
    dh: 'dx',
};

const isLow = (a) => a.endsWith('l');
const isHigh = (a) => a.endsWith('h');

const checkNext = ({__a, __b, __c}, path) => {
    if (__a.name === 'mov') {
        if (!isNumericLiteral(__c))
            return false;
        
        const reg = NEXT_REG[__b.name];
        
        if (!reg)
            return false;
        
        const next = path.parentPath.getNextSibling();
        const {node} = next;
        
        if (!node)
            return false;
        
        if (isExpressionStatement(next) && isCallExpression(node.expression)) {
            const {callee} = node.expression;
            
            if (callee.name !== 'mov')
                return false;
        }
        
        if (compare(next, `mov(${reg}, ${__c.value})`))
            return true;
        
        if (isLow(__b.name) && compare(next, `mov(${reg}, 0)`))
            return true;
        
        if (isHigh(__b.name) && isNumericLiteral(__c, {value: 0}) && compare(next, `mov(${reg}, __a)`))
            return true;
        
        return __c.value && __c.value === 0xff;
    }
    
    if (__a.name === 'xor') {
        if (__b.name !== __c.name)
            return false;
        
        const reg = NEXT_REG[__b.name];
        
        if (!reg)
            return false;
        
        const next = path.parentPath.getNextSibling();
        
        return compare(next, `xor(${reg}, ${reg})`);
    }
    
    return false;
};

export const report = () => `Assign two-bytes register instead of assigning one-byte registers twice`;

export const match = () => ({
    '__a(__b, __c)': checkNext,
});

export const replace = () => ({
    '__a(__b, __c)': removeNext,
});

const removeNext = ({__a, __b, __c}, path) => {
    const nextPath = path.parentPath.getNextSibling();
    const reg = REG[__b.name];
    const nextValues = getTemplateValues(nextPath.node.expression, 'mov(__a, __b)');
    
    remove(nextPath);
    
    if (__a.name === 'xor')
        return `xor(${reg}, ${reg})`;
    
    if (__c.value === 0xff)
        return `mov(${reg}, 0xffff)`;
    
    if (isHigh(__b.name))
        return `mov(${reg}, ${extract(nextValues.__b)})`;
    
    return `mov(${reg}, ${__c.value})`;
};
