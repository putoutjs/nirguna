import {operator} from 'putout';

const {keys} = Object;
const {rename} = operator;

function getBitness(path) {
    const programPath = path.scope.getProgramParent().path;
    const {directives} = programPath.node;
    
    if (!directives.length)
        return 16;
    
    const {value} = directives[0].value;
    
    if (value === 'use 16')
        return 16;
    
    if (value === 'use 32')
        return 32;
    
    if (value === 'use 64')
        return 64;
    
    return '16';
}

export const report = () => `Use 'reg' instead of 'ureg'`;

export const fix = ({path, names}) => {
    const bitness = getBitness(path);
    
    for (const name of names) {
        rename(path, name, REG[bitness][name]);
    }
    
    if (path.node.returnType)
        path.node.returnType.typeAnnotation.typeName.name = `i${bitness}`;
};

const isUReg = (a) => {
    return keys(REG_16).includes(a);
};

const REG_16 = {
    uax: 'ax',
    ubx: 'bx',
    ucx: 'cx',
    udx: 'dx',
    usi: 'si',
    udi: 'di',
    usp: 'sp',
    ubp: 'bp',
};

const REG_32 = {
    uax: 'eax',
    ubx: 'ebx',
    ucx: 'ecx',
    udx: 'edx',
    usi: 'esi',
    udi: 'edi',
    usp: 'esp',
    ubp: 'ebp',
};

const REG_64 = {
    uax: 'rax',
    ubx: 'rbx',
    ucx: 'rcx',
    udx: 'rdx',
    usi: 'rsi',
    udi: 'rdi',
    usp: 'rsp',
    ubp: 'rbp',
};

const REG = {
    16: REG_16,
    32: REG_32,
    64: REG_64,
};

export const traverse = ({push}) => ({
    Function(path) {
        const {bindings} = path.scope;
        const names = [];
        
        for (const name of keys(bindings)) {
            if (!isUReg(name))
                continue;
            
            names.push(name);
        }
        
        if (!names.length)
            return;
        
        push({
            path,
            names,
        });
    },
    Program: {
        exit(path) {
            path.node.directives = [];
        },
    },
});
