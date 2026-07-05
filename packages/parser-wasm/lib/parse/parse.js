import {parse as wastParse} from '@webassemblyjs/wast-parser';
import {traverse} from '@webassemblyjs/ast';
import {types} from '@putout/babel';
import {visitors} from './visitors/visitors.js';

const {program} = types;

export const parse = (source) => {
    const ast = wastParse(source);
    const body = [];
    
    traverse(ast, {
        Module(path) {
            const {fields} = path.node;
            
            const exports = collectExports(fields);
            
            body.push(...transformFields(fields, exports));
        },
    });
    
    return program(body);
};

function collectExports(fields) {
    const exports = {};
    let funcIndex = -1;
    
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        
        if (field.type === 'Func') {
            funcIndex++;
            continue;
        }
        
        if (field.type === 'ModuleExport') {
            exports[funcIndex] = field.name;
            const prev = fields[i - 1];
            field.isAdjacent = prev?.type === 'Func';
        }
    }
    
    return exports;
}

function transformFields(fields, exports) {
    const result = [];
    let funcIndex = -1;
    let pendingComments = [];
    
    for (const field of fields) {
        if (field.type === 'Func') {
            funcIndex++;
            
            if (pendingComments.length) {
                const node = visitors.Func(field, exports[funcIndex]);
                attachLeadingComments(node, pendingComments);
                pendingComments = [];
                result.push(node);
            } else {
                result.push(visitors.Func(field, exports[funcIndex]));
            }
            continue;
        }
        
        if (field.type === 'LeadingComment') {
            pendingComments.push(field);
            continue;
        }
        
        const visit = visitors[field.type];
        
        if (!visit) {
            pendingComments = [];
            continue;
        }
        
        const node = visit(field, field.isAdjacent);
        
        if (node) {
            result.push(node);
            
            if (pendingComments.length) {
                attachLeadingComments(node, pendingComments);
                pendingComments = [];
            }
        }
    }
    
    return result;
}

const attachLeadingComments = (node, comments) => {
    if (!comments.length)
        return;
    
    node.leadingComments = comments.map((field) => ({
        type: 'CommentLine',
        value: field.value,
    }));
};
