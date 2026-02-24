import {types} from 'putout';

const {
    identifier,
    tsTypeReference,
} = types;

const TARGETS = {
    'wasm-i32': 'i32',
    'wasm-i64': 'i64',
    'wasm-f32': 'f32',
    'wasm-f64': 'f64',
};

export const report = (path, {options}) => {
    const {target = 'wasm-i32'} = options;
    return `Use type: '${TARGETS[target]}'`;
};

export const fix = ({path}, {options}) => {
    const {target = 'wasm-i32'} = options;
    
    path.node.typeAnnotation = tsTypeReference(identifier(TARGETS[target]));
};

export const traverse = ({options, push}) => ({
    Function(path) {
        const {target = 'wasm-i32'} = options;
        const params = path.get('params');
        
        for (const param of params) {
            if (param.node.typeAnnotation)
                continue;
            
            push({
                path: param,
                target,
            });
        }
    },
});

