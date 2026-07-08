import {types} from '@putout/babel';

const {
    identifier,
    expressionStatement,
    returnStatement,
    callExpression,
} = types;

const ids = {
    return: returnId,
    br: brId,
    br_if: brIfId,
};

export const Instr = (instr, {emitExpression}) => {
    const {id} = instr;
    
    if (ids[id])
        return ids[id](instr, {
            emitExpression,
        });
    
    return expressionStatement(emitExpression(instr));
};

function returnId(instr, {emitExpression}) {
    const [first] = instr.args;
    return returnStatement(emitExpression(first));
}

function brId(instr) {
    const [label] = instr.args;
    
    return expressionStatement(callExpression(identifier('br'), [
        identifier(label.value),
    ]));
}

function brIfId(instr, {emitExpression}) {
    const [label, ...rest] = instr.args;
    const [test] = rest;
    
    return expressionStatement(callExpression(identifier('br_if'), [
        identifier(label.value),
        emitExpression(test),
    ]));
}
