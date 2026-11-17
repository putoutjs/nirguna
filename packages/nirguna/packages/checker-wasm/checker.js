import {checkNodes} from '#checker';

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

export const check = (source) => checkNodes(source, {
    isTS: true,
    allowed,
});
