import {types} from 'putout';

const {
    identifier,
    tsTypeReference,
    isFunction,
    tsTypeAnnotation,
} = types;

const TARGETS = {
    'wasm-i32': 'i32',
    'wasm-i64': 'i64',
    'wasm-f32': 'f32',
    'wasm-f64': 'f64',
};

export const report = ({target}) => {
    return `Use type: '${TARGETS[target]}'`;
};

export const fix = ({path, target}) => {
    const typeAnnotation = tsTypeReference(identifier(TARGETS[target]));
    
    if (isFunction(path)) {
        path.node.returnType = tsTypeAnnotation(typeAnnotation);
        return;
    }
    
    path.node.typeAnnotation = typeAnnotation;
};

export const traverse = ({options, push}) => ({
    Function(path) {
        const {target = 'wasm-i32'} = options;
        const params = path.get('params');
        
        if (!path.node.returnType)
            push({
                path,
                target,
            });
        
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
