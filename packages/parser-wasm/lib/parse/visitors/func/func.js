import {types} from '@putout/babel';

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
    memberExpression,
} = types;

export const Func = ({name, signature, body}, exportedName) => {
    const {params, results} = signature;
    const funcName = exportedName || name.value;
    
    const args = params.map(({id, valtype}) => {
        const param = identifier(id);
        
        param.typeAnnotation = typeAnnotation(valtype);
        
        return param;
    });
    
    const fn = functionDeclaration(
        identifier(funcName),
        args,
        blockStatement(body.map(emitStatement)),
    );
    
    if (results[0])
        fn.returnType = typeAnnotation(results[0]);
    
    return exportNamedDeclaration(fn, []);
};

const emitStatement = (instr) => {
    if (instr.id === 'return')
        return {
            type: 'ReturnStatement',
            argument: emitExpr(instr.args[0]),
        };
    
    return expressionStatement(emitExpr(instr));
};

const emitExpr = (node) => {
    if (node.type === 'Identifier')
        return identifier(node.value);
    
    if (node.type === 'NumberLiteral')
        return numericLiteral(node.value);
    
    if (node.type === 'CallInstruction')
        return callExpression(identifier(node.index.value), (node.instrArgs || []).map(emitExpr));
    
    if (node.object)
        return dottedCall(node.object, node.id, node.args.map(emitExpr));
    
    if (!node.args.length)
        return identifier(node.id);
    
    return callExpression(identifier(node.id), node.args.map(emitExpr));
};

const typeAnnotation = (valtype) => {
    return tsTypeAnnotation(tsTypeReference(identifier(valtype)));
};

const dottedCall = (object, id, args) => {
    return callExpression(memberExpression(identifier(object), identifier(id)), args);
};
