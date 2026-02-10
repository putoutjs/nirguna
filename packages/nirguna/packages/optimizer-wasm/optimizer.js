import putout from 'putout';
import * as wasm from '@nirguna/plugin-optimizer-wasm';

export const optimize = (source) => {
    const {code, places} = putout(source, {
        isTS: true,
        plugins: [
            ['nirguna/optimizer-wasm', wasm],
        ],
    });
    
    return [code, places];
};
