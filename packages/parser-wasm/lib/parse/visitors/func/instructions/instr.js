import {types} from '@putout/babel';

const {
    blockStatement,
    ifStatement,
    breakStatement,
    identifier,
    continueStatement,
    expressionStatement,
} = types;

export const Instr = (instr, {emitExpression, labelKinds}) => {
    if (instr.id === 'return')
        return {
            type: 'ReturnStatement',
            argument: emitExpression(instr.args[0]),
        };
    
    if (instr.id === 'br' || instr.id === 'br_if') {
        const [label, ...rest] = instr.args;
        const kind = labelKinds.get(label.value);
        const jump = createJump({
            kind,
            label,
        });
        
        if (instr.id === 'br')
            return jump;
        
        const [first] = rest;
        
        return ifStatement(emitExpression(first), blockStatement([jump]));
    }
    
    return expressionStatement(emitExpression(instr));
};

function createJump({kind, label}) {
    if (kind === 'loop')
        return continueStatement(identifier(label.value));
    
    return breakStatement(identifier(label.value));
}
