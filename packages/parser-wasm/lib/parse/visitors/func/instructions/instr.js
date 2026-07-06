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
        const jump = kind === 'loop' ? continueStatement(identifier(label.value)) : breakStatement(identifier(label.value));
        
        if (instr.id === 'br')
            return jump;
        
        return ifStatement(emitExpression(rest[0]), blockStatement([jump]));
    }
    
    return expressionStatement(emitExpression(instr));
};

