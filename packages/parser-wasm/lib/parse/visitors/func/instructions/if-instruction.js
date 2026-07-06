import {types} from '@putout/babel';

const {blockStatement, ifStatement} = types;

export const IfInstruction = (instr, {labelKinds, emitExpression, emitStatement}) => {
    const test = emitExpression(instr.test[0]);
    const consequent = blockStatement(instr.consequent.map((i) => emitStatement(i, labelKinds)));
    const alternate = instr.alternate.length ? blockStatement(instr.alternate.map((i) => emitStatement(i, labelKinds))) : null;
    
    return ifStatement(test, consequent, alternate);
};

