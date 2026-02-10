import * as wasm from '#compiler-wasm';
import * as fasm from '#compiler-fasm';

export const compile = async (source, options) => {
    const {
        target,
        type,
        name,
        optimization,
        config,
        onStageChange,
    } = options;
    
    if (target === 'wasm')
        return await wasm.compile(source, {
            type,
            name,
            optimization,
            onStageChange,
        });
    
    return await fasm.compile(source, {
        type,
        target,
        optimization,
        config,
        onStageChange,
    });
};
