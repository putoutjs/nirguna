import {parse as wastParse} from '@webassemblyjs/wast-parser';
import {traverse} from '@webassemblyjs/ast';
import {types} from '@putout/babel';
import {visitors} from './visitors/visitors.js';
import {buildExportMap} from './visitors/module-export/export-map.js';

const {program} = types;

export const parse = (source) => {
    const ast = wastParse(source);
    const body = [];
    
    traverse(ast, {
        Module(path) {
            const {fields} = path.node;
            const exportMap = buildExportMap(fields, ast.comments);
            
            body.push(...transformFields(fields, {
                exportMap,
            }));
        },
    });
    
    return program(body);
};

function transformFields(fields, {exportMap}) {
    const result = [];
    let funcIndex = -1;
    let pendingComments = [];
    
    for (const field of fields) {
        if (field.type === 'Func') {
            funcIndex++;
            
            if (pendingComments.length) {
                const node = visitors.Func(field, {
                    exportMap,
                });
                
                attachLeadingComments(node, pendingComments);
                pendingComments = [];
                result.push(node);
            } else {
                result.push(visitors.Func(field, {
                    exportMap,
                }));
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
        
        const node = visit(field, {
            exportMap,
        });
        
        if (node) {
            if (pendingComments.length) {
                attachLeadingComments(node, pendingComments);
                pendingComments = [];
            }
            
            result.push(node);
            
            continue;
        }
        
        if (pendingComments.length && field.type === 'ModuleExport') {
            const prev = result.at(-1);
            
            if (prev)
                attachLeadingComments(prev, pendingComments);
            
            pendingComments = [];
        }
    }
    
    return result;
}

const attachLeadingComments = (node, comments) => {
    node.leadingComments = comments.map((field) => ({
        type: 'CommentLine',
        value: field.value,
    }));
};
