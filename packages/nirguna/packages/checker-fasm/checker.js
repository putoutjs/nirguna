import {createChecker} from '@nirguna/operator-checker';

const allowed = new Set([
    'Program',
    'ExpressionStatement',
    'CallExpression',
    'Identifier',
    'NumericLiteral',
    'StringLiteral',
    'LabeledStatement',
    'BlockStatement',
    'BinaryExpression',
    'ArrayExpression',
    'MemberExpression',
    'SequenceExpression',
    'AssignmentExpression',
    'TaggedTemplateExpression',
    'TemplateLiteral',
    'TemplateElement',
]);

export const check = createChecker({
    isTS: false,
    allowed,
});
