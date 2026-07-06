import {types} from '@putout/babel';

const {
    booleanLiteral,
    whileStatement,
    identifier,
    labeledStatement,
    blockStatement,
} = types;

export const LoopInstruction = (instr, {labelKinds, emitStatement}) => {
    labelKinds.set(instr.label.value, 'loop');
    
    const body = blockStatement(instr.instr.map((i) => emitStatement(i, labelKinds)));
    
    return labeledStatement(identifier(instr.label.value), whileStatement(booleanLiteral(true), body));
};
