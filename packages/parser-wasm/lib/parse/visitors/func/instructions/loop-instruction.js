import {types} from '@putout/babel';

const {
    booleanLiteral,
    doWhileStatement,
    identifier,
    labeledStatement,
} = types;

export const LoopInstruction = (instr, {emitBlockStatement}) => {
    const body = emitBlockStatement(instr.instr);
    const loop = doWhileStatement(booleanLiteral(true), body);
    const id = identifier(instr.label.value);
    
    return labeledStatement(id, loop);
};
