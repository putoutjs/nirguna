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
    
    if (target === 'wast')
        return await wasm.compile(source, {
            type: 'assembly',
            name,
            optimization,
            onStageChange,
        });
    
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
