import putout from 'putout';
import * as removeNestedBlocks from '@putout/plugin-remove-nested-blocks';
import * as esm from '@putout/plugin-esm';
import * as nirguna from '@nirguna/plugin-nirguna';
import * as wasm from '@nirguna/plugin-wasm';

export const transform = (source) => {
    const {code, places} = putout(source, {
        fix: true,
        isTS: true,
        plugins: [
            ['nirguna/wasm', wasm],
            ['nirguna/nirguna', nirguna],
            ['esm', esm],
            ['remove-nested-blocks', removeNestedBlocks],
        ],
    });
    
    return [code, places];
};
