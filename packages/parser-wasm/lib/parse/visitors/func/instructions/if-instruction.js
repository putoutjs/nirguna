import {types} from '@putout/babel';

const {blockStatement} = types;

export const IfInstruction = (instr, {labelKinds, emitExpr, emitStatement}) => {
    return {
        type: 'IfStatement',
        test: emitExpr(instr.test[0]),
        consequent: blockStatement(instr.consequent.map((i) => emitStatement(i, labelKinds))),
        alternate: instr.alternate.length ? blockStatement(instr.alternate.map((i) => emitStatement(i, labelKinds))) : null,
    };
};
