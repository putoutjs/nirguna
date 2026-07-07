import {types} from '@putout/babel';

const {
    blockStatement,
    ifStatement,
    breakStatement,
    identifier,
    continueStatement,
    expressionStatement,
    returnStatement,
} = types;

const ids = {
    return: returnId,
    br: brId,
    br_if: brIfId,
};

export const Instr = (instr, {emitExpression, labelKinds}) => {
    const {id} = instr;
    
    if (ids[id])
        return ids[id](instr, {
            labelKinds,
            emitExpression,
        });
    
    return expressionStatement(emitExpression(instr));
};

function createJump({kind, label}) {
    if (kind === 'loop')
        return continueStatement(identifier(label.value));
    
    return breakStatement(identifier(label.value));
}

function returnId(instr, {emitExpression}) {
    const [first] = instr.args;
    return returnStatement(emitExpression(first));
}

function brId(instr, {labelKinds}) {
    const [label] = instr.args;
    const kind = labelKinds.get(label.value);
    
    const jump = createJump({
        kind,
        label,
    });
    
    return jump;
}

function brIfId(instr, {labelKinds, emitExpression}) {
    const [label, ...rest] = instr.args;
    const kind = labelKinds.get(label.value);
    
    const jump = createJump({
        kind,
        label,
    });
    
    const [first] = rest;
    
    return ifStatement(emitExpression(first), blockStatement([jump]));
}

