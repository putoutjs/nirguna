import {operator, types} from 'putout';
import {is8bit} from '@nirguna/operator-fasm/regs';

const {isMemberExpression} = types;
const {compare} = operator;

const checkFirst = (name) => (path) => {
    const [first] = path.node.arguments;
    return first.name === name;
};

const checkStartsWith = (a) => (path) => {
    const [first] = path.node.arguments;
    const {name} = first;
    
    return name.startsWith(a);
};

const isEdx = checkFirst('edx');
const isDx = checkFirst('dx');
const is32 = checkStartsWith('e');
const is64 = checkStartsWith('r');

const isPrev = (instr) => (path) => {
    const prev = path.parentPath.getPrevSibling();
    return compare(prev, instr);
};

const isPrevXorEax = isPrev('xor(eax, eax)');
const isPrevXorAx = isPrev('xor(ax, ax)');

export const report = (path) => {
    if (isEdx(path) && isPrevXorEax(path))
        return `Use 'cdq' instead of 'mov'`;
    
    if (isDx(path) && isPrevXorAx(path))
        return `Use 'cdq' instead of 'mov'`;
    
    return `Use 'xor' instead of 'mov'`;
};

export const exclude = () => [
    'mov(__array, __a)',
    'mov(ds, __a)',
    'mov(ss, __a)',
    'mov(es, __a)',
];

export const match = () => ({
    'mov(__a, 0)': ({__a}) => {
        if (isMemberExpression(__a))
            return false;
        
        return !is8bit(__a.name);
    },
    'mov(__a, 1)': (vars, path) => {
        if (is32(path))
            return true;
        
        if (is64(path))
            return true;
        
        return isDx(path);
    },
});

export const replace = () => ({
    'mov(__a, 0)': (vars, path) => {
        if (isEdx(path) && isPrevXorEax(path))
            return `cdq()`;
        
        if (isDx(path) && isPrevXorAx(path))
            return 'cwd()';
        
        return 'xor(__a, __a)';
    },
    'mov(__a, 1)': (vars, path) => {
        if (isEdx(path) && isPrevXorEax(path))
            return `{
                cdq();
                inc(edx);
            }`;
        
        if (isDx(path) && isPrevXorAx(path))
            return `{
                cwd();
                inc(dx);
            }`;
        
        return `{
            xor(__a, __a);
            inc(__a);
        }`;
    },
});
