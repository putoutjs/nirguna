import {operator} from 'putout';

const {
    compare,
    remove,
    getTemplateValues,
} = operator;

export const report = (path) => `Avoid useless '${path.node.callee.name}'`;

export const match = () => ({
    'jz(__a)': check,
    'jnz(__a)': check,
    'je(__a)': check,
    'jne(__a)': check,
});

export const replace = () => ({
    'jz(__a)': (vars, path) => {
        const prev = path.parentPath.getPrevSibling();
        
        if (compare(prev, 'test(__a, __a)'))
            remove(prev);
        
        return 'jmp(__a)';
    },
    'jnz(__a)': '',
    'jne(__a)': '',
    'je(__a)': (vars, path) => {
        const prev = path.parentPath.getPrevSibling();
        
        if (compare(prev, '__a: cmp(__b, __b)')) {
            const {label} = prev.node;
            remove(prev);
            
            return `${label.name}: jmp(__a)`;
        }
        
        if (compare(prev, 'cmp(__a, __a)'))
            remove(prev);
        
        return 'jmp(__a)';
    },
});

const check = (vars, path) => {
    const {parentPath} = path;
    const prev = parentPath.getPrevSibling();
    const prevPrev = prev.getPrevSibling();
    
    if (isPrevXor(prev))
        return true;
    
    if (isPrevTest(prev) && isPrevXor(prevPrev)) {
        const {__a: testReg} = getTemplateValues(prev.node.expression, 'test(__a, __a)');
        const {__a: xorReg} = getTemplateValues(prevPrev.node.expression, 'xor(__a, __a)');
        
        return isSameReg(testReg, xorReg);
    }
    
    if (isPrevCmp(prev))
        return true;
    
    if (isPrevTest(prev) && compare(prevPrev, '__a: xor(__b, __b)')) {
        const {__a} = getTemplateValues(prev.node.expression, 'test(__a, __a)');
        const {__b} = getTemplateValues(prevPrev, '__a: xor(__b, __b)');
        
        return isSameReg(__a, __b);
    }
    
    return false;
};

const isPrevTest = (path) => compare(path, 'test(__a, __a)');

const isPrevCmp = (path) => {
    if (compare(path, 'cmp(__a, __a)'))
        return true;
    
    return compare(path, '__a: cmp(__b, __b)');
};

const isPrevXor = (path) => compare(path, 'xor(__a, __a)');

function isSameReg(a, b) {
    if (a.name === b.name)
        return true;
    
    return a.name === 'al' && b.name.endsWith('ax');
}
