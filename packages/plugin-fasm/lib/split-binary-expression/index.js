import {operator, types} from 'putout';

const {
    isIdentifier,
    isMemberExpression,
} = types;

const {compare} = operator;

export const report = () => `Split 'binary expression'`;

export const match = () => ({
    '__a = __b + __c': ({__c, __a}) => {
        if (isIdentifier(__c) && /[A-Z]/.test(__c.name))
            return false;
        
        return !isMemberExpression(__a);
    },
});

export const replace = () => ({
    '__a = __b + __c': ({__a, __b}) => {
        if (compare(__a, __b))
            return '__a += __c';
        
        return `{
            __a = __b;
            __a += __c
        }`;
    },
});
