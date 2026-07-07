import {types} from '@putout/babel';

const {
    labeledStatement,
    identifier,
} = types;

export const BlockInstruction = (instr, {emitBlockStatement}) => {
    const body = emitBlockStatement(instr.instr);
    return labeledStatement(identifier(instr.label.value), body);
};
