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
            
            for (const field of fields) {
                const {type} = field;
                const fn = visitors[type];
                
                if (!fn)
                    return;
                
                body.push(fn(field));
            }
        },
    });
    
    return program(body);
};
