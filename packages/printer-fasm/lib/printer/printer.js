import {print as putoutPrint} from '@putout/printer';
import {CallExpression} from './visitors/call-expression.js';
import {MemberExpression} from './visitors/member-expression.js';
import {BlockStatement} from './visitors/block-statement.js';
import {LabeledStatement} from './visitors/labeled-statement.js';
import {ExpressionStatement} from './visitors/expression-statement/expression-statement.js';
import {SequenceExpression} from './visitors/sequence-expression.js';
import {AssignmentExpression} from './visitors/assignment-expression.js';
import {TaggedTemplateExpression} from './visitors/tagged-template-expression.js';
import {StringLiteral} from './visitors/string-literal.js';

export const print = (ast) => {
    return putoutPrint(ast, {
        semantics: {
            comments: false,
            maxElementLengthInOneLine: 100,
        },
        visitors: {
            AssignmentExpression,
            CallExpression,
            MemberExpression,
            BlockStatement,
            LabeledStatement,
            ExpressionStatement,
            SequenceExpression,
            StringLiteral,
            TaggedTemplateExpression,
        },
    });
};
