import {types} from '@putout/babel';
import {instructions} from './instructions/instructions.js';
import {CallInstruction} from './expressions/call-instruction.js';

const {
    identifier,
    expressionStatement,
    functionDeclaration,
    exportNamedDeclaration,
    blockStatement,
    numericLiteral,
    callExpression,
    tsTypeAnnotation,
    tsTypeReference,
    tsTupleType,
    memberExpression,
} = types;

export const Func = (node, {exportMap}) => {
    const {
        name,
        signature,
        body,
    } = node;
    
    const {params, results} = signature;
    
    const args = params.map(({id, valtype}) => {
        const param = identifier(id);
        
        param.typeAnnotation = typeAnnotation(valtype);
        
        return param;
    });
    
    const fn = functionDeclaration(
        identifier(name.value),
        args,
        blockStatement(body.map(emitStatement)),
    );
    
    if (results[0])
        if (results.length > 1)
            fn.returnType = tsTypeAnnotation(tsTupleType(results.map((r) => tsTypeReference(identifier(r)))));
        else
            fn.returnType = typeAnnotation(results[0]);
    
    const info = exportMap.get(name.value);
    
    if (!info || !info.merge)
        return fn;
    
    return exportNamedDeclaration(fn, []);
};

const emitStatement = (instr, labelKinds) => {
    const {type} = instr;
    
    labelKinds = labelKinds || new Map();
    
    if (instructions[type])
        return instructions[type](instr, {
            labelKinds,
            emitExpression,
            emitStatement,
        });
    
    return expressionStatement(emitExpression(instr));
};

const emitExpression = (node) => {
    if (node.type === 'Identifier')
        return identifier(node.value);
    
    if (node.type === 'NumberLiteral')
        return numericLiteral(node.value);
    
    if (node.type === 'CallInstruction')
        return CallInstruction(node, {
            emitExpression,
        });
    
    if (node.object)
        return dottedCall(node.object, node.id, node.args.map(emitExpression));
    
    if (!node.args.length)
        return identifier(node.id);
    
    return callExpression(identifier(node.id), node.args.map(emitExpression));
};

export const typeAnnotation = (valtype) => {
    return tsTypeAnnotation(tsTypeReference(identifier(valtype)));
};

const dottedCall = (object, id, args) => {
    return callExpression(memberExpression(identifier(object), identifier(id)), args);
};
