import {types} from '@putout/babel';

const {
    blockStatement,
    labeledStatement,
    identifier,
    BlockStatement,
} = types;

export const BlockInstruction = (instr, {labelKinds, emitStatement}) => {
    labelKinds.set(instr.label.value, 'block');
    
    const body = getBody(instr, {
        emitStatement,
        labelKinds,
    });
    
    return labeledStatement(identifier(instr.label.value), body);
};

function getBody(instr, {emitStatement, labelKinds}) {
    const result = [];
    
    for (const instruction of instr.instr) {
        result.push(emitStatement(
            instruction,
            labelKinds,
        ));
    }
    
    return blockStatement(result);
}

