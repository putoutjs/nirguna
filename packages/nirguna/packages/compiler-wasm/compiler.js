import {inflate} from '@nirguna/inflater-wasm';
import {transform} from '@nirguna/transformer-wasm';
import {print} from '@nirguna/printer-wasm';
import {translate} from '@nirguna/translator-wasm';
import {optimize} from '#optimizer-wasm';

const noop = () => {};

export const compile = async (source, options = {}) => {
    const {
        name,
        type = 'binary',
        onStageChange = noop,
        plugins,
    } = options;
    
    const emitStateChange = (a) => onStageChange(a, {
        last: false,
        places: [],
    });
    
    const emitLastStateChange = (a, places = []) => onStageChange(a, {
        last: true,
        places,
    });
    
    const [inflated, inflatePlaces] = inflate(source);
    
    if (inflatePlaces.length) {
        emitLastStateChange('inflate', inflatePlaces);
        
        return [inflated, inflatePlaces];
    }
    
    emitStateChange('inflate');
    
    const [code, compilePlaces] = transform(inflated, {
        plugins,
    });
    
    if (compilePlaces.length) {
        emitLastStateChange('Transform', compilePlaces);
        return [code, compilePlaces];
    }
    
    if (type === 'code') {
        emitLastStateChange('Transform');
        return [code, compilePlaces];
    }
    
    emitStateChange('transform');
    const [optimized, optimizedPlaces] = optimize(code);
    
    if (/optimize/.test(type)) {
        emitLastStateChange('optimize');
        return [optimized, optimizedPlaces];
    }
    
    emitStateChange('Optimize');
    const assembly = print(optimized);
    
    if (type === 'assembly')
        return [
            assembly,
            [],
        ];
    
    emitStateChange('print');
    const [binary, places] = await translate(assembly, {
        name,
        type,
    });
    
    emitLastStateChange('translate', places);
    
    return [binary, places];
};
