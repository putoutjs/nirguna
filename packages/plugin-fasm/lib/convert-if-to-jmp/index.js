import {types, operator} from 'putout';
import {parseOperator} from './operator.js';

const {
    callExpression,
    labeledStatement,
    identifier,
    isLabeledStatement,
    isBinaryExpression,
    isArrayExpression,
    isLogicalExpression,
} = types;

const {
    replaceWith,
    insertAfter,
    extract,
} = operator;

const createName = (suffix, type) => {
    return `__nirguna_fasm_if_${type}_${suffix}`;
};

export const report = () => `Use 'jmp' instead of 'if'`;
export const match = () => ({
    'if (__a) __b': ({__a}) => {
        return isBinaryExpression(__a) || isLogicalExpression(__a);
    },
    'if (__a) __b; else __c': ({__a}) => isBinaryExpression(__a),
});

export const replace = ({options}) => {
    let {labelSuffix = 0} = options;
    
    return {
        'if (__a) __b': (vars, path) => {
            const next = getNext(path);
            const name = createName(++labelSuffix, 'end');
            const test = parseTest(path, name);
            
            createLabel(next, name);
            
            return `{
                ${test}
                __b;
            }`;
        },
        'if (__a) __b; else __c': (vars, path) => {
            const next = getNext(path);
            const suffix = ++labelSuffix;
            const endLabel = createName(suffix, 'end');
            const elseLabel = createName(suffix, 'else');
            const test = parseTest(path, elseLabel);
            
            createLabel(next, endLabel);
            
            return `{
                ${test}
                __b;
                jmp(${endLabel});
                ${elseLabel}:
                __c;
            }`;
        },
    };
};

const maybeBraces = (node, value) => {
    if (isArrayExpression(node))
        return `[${value}]`;
    
    return value;
};

function parseBinaryTest({left, right, operator}, options = {}) {
    const {direct = false} = options;
    const extractedLeft = extract(left);
    const extractedRight = extract(right);
    
    return [
        maybeBraces(left, extractedLeft),
        maybeBraces(right, extractedRight),
        parseOperator(operator, {
            direct,
        }),
    ];
}

function parseTest(path, name) {
    const {test} = path.node;
    
    if (isBinaryExpression(test)) {
        const [first, second, jnz] = parseBinaryTest(test);
        
        return `
            cmp(${first}, ${second});
            ${jnz}(${name});
        `;
    }
    
    if (isLogicalExpression(test)) {
        const {
            left,
            right,
            operator,
        } = test;
        
        if (operator === '&&') {
            const [firstLeft, secondLeft, jnzLeft] = parseBinaryTest(left);
            const [firstRight, secondRight, jnzRight] = parseBinaryTest(right);
            
            return `
                cmp(${firstLeft}, ${secondLeft});
                ${jnzLeft}(${name});
                cmp(${firstRight}, ${secondRight});
                ${jnzRight}(${name});
            `;
        }
        
        if (operator === '||') {
            const [firstLeft, secondLeft, jzLeft] = parseBinaryTest(left, {
                direct: true,
            });
            
            const [firstRight, secondRight, jnzRight] = parseBinaryTest(right);
            
            const nameOr = name.replace('end', 'or');
            
            return `
                cmp(${firstLeft}, ${secondLeft});
                ${jzLeft}(${nameOr});
                cmp(${firstRight}, ${secondRight});
                ${jnzRight}(${name});
                ${nameOr}:
            `;
        }
    }
}

function createLabel(path, name) {
    const labelName = identifier(name);
    const label = labeledStatement(labelName, path.node);
    
    replaceWith(path, label);
}

const getLatestLabeledStatement = (path) => {
    do {
        path = path.parentPath;
    } while (isLabeledStatement(path.parentPath));
    return path;
};

function getNext(path) {
    const next = path.getNextSibling();
    
    if (next.node)
        return next;
    
    if (path.parentPath.isLabeledStatement())
        path = getLatestLabeledStatement(path);
    
    insertAfter(path, callExpression(identifier('nop'), []));
    
    return path.getNextSibling();
}
