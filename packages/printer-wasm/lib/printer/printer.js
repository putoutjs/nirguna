import {print as putoutPrint} from '@putout/printer';
import {CallExpression} from './visitors/call-expression/call-expression.js';
import {BreakStatement} from './visitors/break-statement.js';
import {BlockStatement} from './visitors/block-statement.js';
import {ExpressionStatement} from './visitors/expression-statement/expression-statement.js';
import {ExportNamedDeclaration} from './visitors/export-named-declaration.js';
import {FunctionDeclaration} from './visitors/function-declaration/function-declaration.js';
import {Program} from './visitors/program.js';
import {Identifier} from './visitors/identifier.js';
import {ReturnStatement} from './visitors/return.js';
import {IfStatement} from './visitors/if-statement.js';
import {LabeledStatement} from './visitors/labeled-statement.js';
import {VariableDeclaration} from './visitors/variable-declaration.js';
import {DoWhileStatement} from './visitors/do-while-statement.js';

export const print = (ast) => {
    return putoutPrint(ast, {
        format: {
            quote: '"',
        },
        semantics: {
            comments: false,
        },
        visitors: {
            ReturnStatement,
            BlockStatement,
            BreakStatement,
            CallExpression,
            DoWhileStatement,
            IfStatement,
            LabeledStatement,
            ExpressionStatement,
            ExportNamedDeclaration,
            FunctionDeclaration,
            Program,
            Identifier,
            VariableDeclaration,
        },
    });
};
