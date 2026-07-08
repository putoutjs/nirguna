import {types} from '@putout/babel';

const {blockStatement, ifStatement} = types;

export const IfInstruction = (instr, {emitExpression, emitStatement}) => {
    const test = createTest(instr, {
        emitExpression,
    });
    
    const consequent = createConsequent(instr, {
        emitStatement,
    });
    
    const alternate = createAlternate(instr, {
        emitStatement,
    });
    
    return ifStatement(test, consequent, alternate);
};

function createTest(instr, {emitExpression}) {
    const {test} = instr;
    const [first] = test;
    
    return emitExpression(first);
}

function createConsequent(instr, {emitStatement}) {
    const body = [];
    
    for (const consequent of instr.consequent) {
        body.push(emitStatement(consequent));
    }
    
    return blockStatement(body);
}

function createAlternate(instr, {emitStatement}) {
    if (!instr.alternate.length)
        return null;
    
    const body = [];
    
    for (const alternate of instr.alternate) {
        body.push(emitStatement(alternate));
    }
    
    return blockStatement(body);
}
