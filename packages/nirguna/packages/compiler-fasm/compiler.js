import {transform} from '@nirguna/transformer-fasm';
import {print} from '#printer-fasm';
import {translate} from '#translator-fasm';
import {optimize} from '#optimizer-fasm';

const noop = () => {};

export const compile = async (source, options = {}) => {
    const {
        name,
        type = 'binary',
        optimization = true,
        target = 'fasm',
        config,
        onStageChange = noop,
    } = options;
    
    const emitStateChange = (a) => onStageChange(a, {
        last: false,
        places: [],
    });
    
    const emitLastStateChange = (a, places = []) => onStageChange(a, {
        last: true,
        places,
    });
    
    const [code, compilePlaces] = transform(source, config);
    
    if (compilePlaces.length) {
        emitLastStateChange('transform', compilePlaces);
        
        return [code, compilePlaces];
    }
    
    if (type === 'code') {
        emitLastStateChange('transform');
        return [code, compilePlaces];
    }
    
    emitStateChange('transform');
    
    const [optimized, optimizedPlaces] = optimization ? optimize(code) : [
        code,
        [],
    ];
    
    if (type === 'optimized') {
        emitLastStateChange('optimize');
        return [optimized, optimizedPlaces];
    }
    
    emitStateChange('optimize');
    
    const assembly = print(optimized);
    
    if (type === 'assembly' || target === 'asm') {
        emitLastStateChange('Print');
        return [
            assembly,
            [],
        ];
    }
    
    emitStateChange('print');
    
    const [binary, places] = await translate(assembly, {
        name,
        type,
    });
    
    emitLastStateChange('translate', places);
    
    return [binary, places];
};
