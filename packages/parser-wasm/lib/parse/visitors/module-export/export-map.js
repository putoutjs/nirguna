import {types} from '@putout/babel';
import {tryCatch} from 'try-catch';

const {isValidIdentifier} = types;

export const buildExportMap = (fields) => {
    const map = new Map();
    
    for (const {name: exportedName, descr, type} of fields) {
        if (type !== 'ModuleExport')
            continue;
        
        const name = descr.id.value;
        const [error] = tryCatch(isValidIdentifier, name);
        const merge = !error;
        
        map.set(exportedName, {
            exportedName,
            merge,
        });
    }
    
    return map;
};
