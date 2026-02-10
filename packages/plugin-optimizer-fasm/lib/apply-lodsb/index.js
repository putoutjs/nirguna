import {operator, types} from 'putout';

const {
    isExpressionStatement,
    isLabeledStatement,
} = types;

const {remove, compareAny} = operator;

const isUSI = (name) => {
    return /[re]?si/.test(name);
};

export const report = () => `Use 'lodsb' instead of assigning 'al'`;

export const match = () => ({
    'al = [__b]': check,
    'mov(al, [__b])': check,
    '__a: mov(al, [__b])': check,
});

function check({__b}, path) {
    const {name} = __b;
    
    if (!isUSI(name))
        return false;
    
    const next = getNext(path);
    
    return compareAny(next, [
        `++(${name})`,
        `inc(${name})`,
    ]);
}

export const replace = () => ({
    'al = [__b]': transform,
    'mov(al, [__b])': transform,
    '__a: mov(al, [__b])': transform,
});

function transform({}, path) {
    const next = getNext(path);
    remove(next);
    
    if (isLabeledStatement(path))
        return '__a: lodsb()';
    
    return 'lodsb()';
}

function getNext(path) {
    const next = path.getNextSibling();
    
    if (isExpressionStatement(next))
        return next;
    
    return path.parentPath.getNextSibling();
}
