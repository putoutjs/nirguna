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
    
    for (const field of fields) {
        if (field.type === 'Func') {
            funcIndex++;
            continue;
        }
        
        if (field.type === 'ModuleExport')
            exports[funcIndex] = field.name;
    }
    
    return exports;
}

function transformFields(fields, exports) {
    const result = [];
    let funcIndex = -1;
    
    for (const field of fields) {
        if (field.type === 'Func') {
            funcIndex++;
            result.push(visitors.Func(field, exports[funcIndex]));
            
            continue;
        }
        
        const visit = visitors[field.type];
        
        if (!visit)
            continue;
        
        const node = visit(field);
        
        if (node)
            result.push(node);
    }
    
    return result;
}
