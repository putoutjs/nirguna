import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    Identifier,
} = types;

const CALL = identifier('call');

export const CallInstruction = (node, {emitExpression}) => {
    const {instrArgs = []} = node;
    const args = instrArgs.map(emitExpression);
    const id = identifier(node.index.value);
    
    return callExpression(CALL, [id, ...args]);
};

