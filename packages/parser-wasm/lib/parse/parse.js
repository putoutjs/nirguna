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
            
            // First pass: collect export names per func index
            let funcIndex = -1;
            const exports = {};
            
            for (const field of fields) {
                if (field.type === 'Func')
                    ++funcIndex;
                
                if (field.type === 'ModuleExport')
                    exports[funcIndex] = field.name;
            }
            
            // Second pass: process fields
            funcIndex = -1;
            
            for (const field of fields) {
                if (field.type === 'Func') {
                    ++funcIndex;
                    body.push(visitors.Func(field, exports[funcIndex]));
                    continue;
                }
                
                const fn = visitors[field.type];
                
                if (!fn)
                    continue;
                
                const result = fn(field);
                
                if (result)
                    body.push(result);
            }
        },
    });
    
    return program(body);
};
