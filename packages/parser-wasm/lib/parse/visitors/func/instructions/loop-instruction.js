import {types} from '@putout/babel';

const {
    booleanLiteral,
    whileStatement,
    identifier,
    labeledStatement,
} = types;

export const LoopInstruction = (instr, {emitBlockStatement}) => {
    const body = emitBlockStatement(instr.instr);
    const loop = whileStatement(booleanLiteral(true), body);
    const id = identifier(instr.label.value);
    
    return labeledStatement(id, loop);
};
