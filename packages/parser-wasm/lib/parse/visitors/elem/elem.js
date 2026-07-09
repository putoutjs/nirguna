import {types} from '@putout/babel';
import {emitExpression} from '../func/func.js';

const {
    identifier,
    callExpression,
    expressionStatement,
} = types;

export const Elem = (node) => {
    const [offset] = node.offset;
    const funcs = [];
    
    for (const {value} of node.funcs) {
        funcs.push(identifier(value));
    }
    
    return expressionStatement(callExpression(identifier('elem'), [
        emitExpression(offset),
        ...funcs,
    ]));
};
