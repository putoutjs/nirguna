import {types} from '@putout/babel';

const {blockStatement, ifStatement} = types;

export const IfInstruction = (instr, {labelKinds, emitExpression, emitStatement}) => {
    const test = createTest(instr, {
        emitExpression,
    });
    
    const consequent = createConsequent(instr, {
        emitStatement,
        labelKinds,
    });
    const alternate = createAlternate(instr, {
        emitStatement,
        labelKinds,
    });
    
    return ifStatement(test, consequent, alternate);
};

function createTest(instr, {emitExpression}) {
    const {test} = instr;
    const [first] = test;
    
    return emitExpression(first);
}

function createConsequent(instr, {emitStatement, labelKinds}) {
    const body = [];
    
    for (const consequent of instr.consequent) {
        body.push(emitStatement(consequent, labelKinds));
    }
    
    return blockStatement(body);
}

function createAlternate(instr, {emitStatement, labelKinds}) {
    if (!instr.alternate.length)
        return null;
    
    const body = [];
    
    for (const alternate of instr.alternate) {
        body.push(emitStatement(alternate, labelKinds));
    }
    
    return blockStatement(body);
}
