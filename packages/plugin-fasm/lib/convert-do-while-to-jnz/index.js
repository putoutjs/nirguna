import {
    template,
    types,
    operator,
} from 'putout';

const {
    insertAfter,
    replaceWith,
    compare,
    extract,
} = operator;

const {
    identifier,
    expressionStatement,
    isCallExpression,
    labeledStatement,
    isBooleanLiteral,
} = types;

const createStartLabel = (line) => `__nirguna_do_while_${line}`;
const createConditionLabel = (line) => `__nirguna_do_while_condition_${line}`;

export const report = () => `Use 'jnz' instead of 'do-while'`;

export const match = () => ({
    'do {__body} while (--__a)': ({__a}) => {
        return /^(e?cx|cl)$/.test(__a.name);
    },
});

export const replace = () => ({
    'do {__body} while (--__a)': ({__body}, path) => {
        const {line} = path.node.loc.start;
        const startLabel = createStartLabel(line);
        const loopExpression = template.ast(`loop(${startLabel})`);
        const conditionLabel = createConditionLabel(line);
        
        let conditionExpression = expressionStatement(loopExpression);
        const wasContinue = maybeReplaceContinueWithJmp(path, conditionLabel);
        
        if (wasContinue)
            conditionExpression = labeledStatement(identifier(conditionLabel), conditionExpression);
        
        __body.body.push(conditionExpression);
        maybeReplaceBreak(path, line);
        
        return `${startLabel}: __body`;
    },
    'do {__body} while (!__a)': ({__a, __body}, path) => {
        const {line} = path.node.loc.start;
        const startLabel = createStartLabel(line);
        const conditionLabel = createConditionLabel(line);
        const expression = isCallExpression(__a) ? __a : template.ast(`test(${__a.name}, ${__a.name})`);
        
        let conditionExpression = expressionStatement(expression);
        const wasContinue = maybeReplaceContinueWithJmp(path, conditionLabel);
        
        if (wasContinue)
            conditionExpression = labeledStatement(identifier(conditionLabel), conditionExpression);
        
        __body.body.push(conditionExpression);
        __body.body.push(expressionStatement(template.ast(`jz(${startLabel})`)));
        
        return `${startLabel}: __body`;
    },
    'do {__body} while (__a)': ({__a, __body}, path) => {
        const {line} = path.node.loc.start;
        const startLabel = createStartLabel(line);
        const conditionLabel = createConditionLabel(line);
        const [one, two, jnz, test] = parseWhileArgs(__a);
        const expression = isCallExpression(__a) ? __a : template.ast(`${test}(${one}, ${two})`);
        
        let conditionExpression = expressionStatement(expression);
        const wasContinue = maybeReplaceContinueWithJmp(path, conditionLabel);
        
        if (wasContinue)
            conditionExpression = labeledStatement(identifier(conditionLabel), conditionExpression);
        
        __body.body.push(conditionExpression);
        __body.body.push(expressionStatement(template.ast(`${jnz}(${startLabel})`)));
        
        maybeReplaceBreak(path, line);
        
        return `${startLabel}: __body`;
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
            'jne',
            'cmp',
        ];
    
    if (compare(__a, '__a === __b'))
        return [
            extract(__a.left),
            extract(__a.right),
            'jz',
            'cmp',
        ];
    
    return [
        __a.name,
        __a.name,
        'jnz',
        'test',
    ];
};

function maybeReplaceBreak(path, line) {
    let wasBreak = false;
    const breakLabel = `__nirguna_do_while_break_${line}`;
    
    path.traverse({
        BreakStatement(path) {
            wasBreak = true;
            path.replaceWithSourceString(`jmp(${breakLabel})`);
        },
    });
    
    if (wasBreak) {
        const nextPath = path.getNextSibling();
        const labeledNode = labeledStatement(identifier(breakLabel), nextPath.node || expressionStatement(template.ast('nop()')));
        
        if (nextPath.node)
            replaceWith(nextPath, labeledNode);
        else
            insertAfter(path, labeledNode);
    }
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
