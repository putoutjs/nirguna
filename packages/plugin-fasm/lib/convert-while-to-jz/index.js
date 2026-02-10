import {
    template,
    types,
    operator,
    print,
} from 'putout';

const {
    compare,
    extract,
    replaceWith,
    insertAfter,
} = operator;

const {
    identifier,
    expressionStatement,
    isCallExpression,
    labeledStatement,
    isBooleanLiteral,
    isArrayExpression,
    blockStatement,
    isBlockStatement,
} = types;

const createStartLabel = (line) => `__nirguna_while_${line}`;
const createConditionLabel = (line) => `__nirguna_while_condition_${line}`;

export const report = () => `Use 'jz' instead of 'while'`;

export const replace = () => ({
    'while(__a) __b': ({__a, __b}, path) => {
        const {line} = path.node.loc.start;
        const startLabel = createStartLabel(line);
        const conditionLabel = createConditionLabel(line);
        const [one, two, jnz, test] = parseWhileArgs(__a);
        const endLabel = createEndLabel(path, line);
        
        let conditionExpression = createExpression(__a, {
            one,
            two,
            test,
        });
        
        const wasContinue = maybeReplaceContinueWithJmp(path, conditionLabel);
        
        if (wasContinue)
            conditionExpression = labeledStatement(identifier(conditionLabel), conditionExpression);
        
        const body = isBlockStatement(__b) ? __b : blockStatement([expressionStatement(__b)]);
        body.body.unshift(expressionStatement(template.ast(`${jnz}(${endLabel})`)));
        body.body.unshift(conditionExpression);
        
        body.body.push(expressionStatement(template.ast(`jmp(${startLabel})`)));
        
        maybeReplaceBreak(path, endLabel);
        
        return labeledStatement(identifier(startLabel), body);
    },
});

const parseWhileArgs = (__a) => {
    if (isBooleanLiteral(__a) && __a.value)
        return [
            'al',
            'al',
            'je',
            'cmp',
        ];
    
    if (isBooleanLiteral(__a) && !__a.value)
        return [
            'al',
            'al',
            'je',
            'cmp',
        ];
    
    if (isArrayExpression(__a))
        return [
            'al',
            'al',
            'jz',
            'test',
        ];
    
    if (compare(__a, '__a === __b'))
        return [
            extract(__a.left),
            extract(__a.right),
            'jz',
            'test',
        ];
    
    return [
        __a.name,
        __a.name,
        'jz',
        'test',
    ];
};

const printExpression = (a) => print(a).slice(0, -2);

function createExpression(__a, {one, two, test}) {
    if (isCallExpression(__a)) {
        const op = printExpression(__a);
        
        return blockStatement([
            expressionStatement(template.ast(op)),
            expressionStatement(template.ast(`${test}(al, al)`)),
        ]);
    }
    
    if (isArrayExpression(__a)) {
        const source = printExpression(__a);
        
        return blockStatement([
            expressionStatement(template.ast(`mov(al, ${source})`)),
            expressionStatement(template.ast(`${test}(al, al)`)),
        ]);
    }
    
    return expressionStatement(template.ast(`${test}(${one}, ${two})`));
}

function maybeReplaceContinueWithJmp(path, startLabel) {
    let was = false;
    
    path.traverse({
        ContinueStatement(path) {
            path.replaceWithSourceString(`jmp(${startLabel})`);
            was = true;
        },
    });
    return was;
}

function maybeReplaceBreak(path, endLabel) {
    path.traverse({
        BreakStatement(path) {
            path.replaceWithSourceString(`jmp(${endLabel})`);
        },
    });
}

function createEndLabel(path, line) {
    const endLabel = `__nirguna_while_end_${line}`;
    const nextPath = path.getNextSibling();
    const labeledNode = labeledStatement(identifier(endLabel), nextPath.node || expressionStatement(template.ast('nop()')));
    
    if (nextPath.node)
        replaceWith(nextPath, labeledNode);
    else
        insertAfter(path, labeledNode);
    
    return endLabel;
}
