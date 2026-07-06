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
    tsTupleType,
    memberExpression,
    labeledStatement,
    breakStatement,
    continueStatement,
    ifStatement,
    booleanLiteral,
    whileStatement,
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
    labelKinds = labelKinds || new Map();
    
    if (instr.type === 'BlockInstruction') {
        if (instr.label)
            labelKinds.set(instr.label.value, 'block');
        
        const body = blockStatement(instr.instr.map((i) => emitStatement(i, labelKinds)));
        
        if (instr.label)
            return labeledStatement(identifier(instr.label.value), body);
        
        return body;
    }
    
    if (instr.type === 'LoopInstruction') {
        if (instr.label)
            labelKinds.set(instr.label.value, 'loop');
        
        const body = blockStatement(instr.instr.map((i) => emitStatement(i, labelKinds)));
        
        if (instr.label)
            return labeledStatement(identifier(instr.label.value), whileStatement(booleanLiteral(true), body));
        
        return whileStatement(booleanLiteral(true), body);
    }
    
    if (instr.type === 'IfInstruction')
        return {
            type: 'IfStatement',
            test: emitExpr(instr.test[0]),
            consequent: blockStatement(instr.consequent.map((i) => emitStatement(i, labelKinds))),
            alternate: instr.alternate.length ? blockStatement(instr.alternate.map((i) => emitStatement(i, labelKinds))) : null,
        };
    
    if (instr.id === 'return')
        return {
            type: 'ReturnStatement',
            argument: emitExpr(instr.args[0]),
        };
    
    if (instr.id === 'br' || instr.id === 'br_if') {
        const [label, ...rest] = instr.args;
        const kind = labelKinds.get(label.value);
        const jump = kind === 'loop' ? continueStatement(identifier(label.value)) : breakStatement(identifier(label.value));
        
        if (instr.id === 'br')
            return jump;
        
        return ifStatement(emitExpr(rest[0]), blockStatement([jump]));
    }
    
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

export const typeAnnotation = (valtype) => {
    return tsTypeAnnotation(tsTypeReference(identifier(valtype)));
};

const dottedCall = (object, id, args) => {
    return callExpression(memberExpression(identifier(object), identifier(id)), args);
};
