import {createChecker} from '@nirguna/operator-checker';

const allowed = new Set([
    'Program',
    'ExportNamedDeclaration',
    'FunctionDeclaration',
    'FunctionExpression',
    'EmptyStatement',
    'BlockStatement',
    'ExpressionStatement',
    'CallExpression',
    'MemberExpression',
    'Identifier',
    'NumericLiteral',
    'StringLiteral',
    'BooleanLiteral',
    'LabeledStatement',
    'DoWhileStatement',
    'IfStatement',
    'ReturnStatement',
    'TSTypeAnnotation',
    'TSTypeReference',
    'TSTupleType',
    'TSTypeParameterInstantiation',
]);

export const check = createChecker({
    isTS: true,
    allowed,
});
