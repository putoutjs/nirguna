import {types} from '@putout/babel';

const {
    blockStatement,
    labeledStatement,
    identifier,
} = types;

export const BlockInstruction = (instr, {labelKinds, emitStatement}) => {
    labelKinds.set(instr.label.value, 'block');
    
    const body = blockStatement(instr.instr.map((i) => emitStatement(i, labelKinds)));
    
    return labeledStatement(identifier(instr.label.value), body);
};
