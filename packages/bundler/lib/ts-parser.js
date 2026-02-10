import {parse} from '@typescript-eslint/typescript-estree';

export default function tsParser() {
    return {
        name: 'ts-parser',
        transform(code, filePath) {
            const ast = parse(code, {
                comment: false,
                errorOnUnknownASTType: false,
                filePath,
                loc: false,
                loggerFn: undefined,
                range: true,
                tokens: false,
            });
            
            return {
                code,
                ast: addStartEnd(ast),
                map: undefined,
            };
        },
    };
}

// This removes the `range` tuple and adds start/end properties instead
function addStartEnd(node) {
    if (Array.isArray(node))
        return node.map((node) => addStartEnd(node));
    
    if (node != null && typeof node === 'object') {
        const {range, ...otherProps} = node;
        const normalizedProps = {};
        
        for (const [key, value] of Object.entries(otherProps)) {
            normalizedProps[key] = addStartEnd(value);
        }
        
        if (Array.isArray(range)) {
            const [start, end] = range;
            
            return {
                start,
                end,
                ...normalizedProps,
            };
        }
        
        return normalizedProps;
    }
    
    return node;
}
