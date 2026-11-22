const {entries} = Object;

export const prepare = (wast) => {
    const result = {};
    let stack = [];
    let imports = [];
    
    for (const [name, value] of entries(wast)) {
        if (name === 'stack') {
            stack = value;
            continue;
        }
        
        if (name === 'imports') {
            imports = value;
            continue;
        }
        
        result[name] = (...args) => {
            value(...args);
            
            return stack[0];
        };
    }
    
    result.declareImport = (module, name, override) => {
        for (const [i, [currentModule, currentName]] of imports.entries()) {
            if (module === currentModule && name === currentName) {
                imports[i].push(override);
                return;
            }
        }
    };
    
    result.undeclareImport = (module, name) => {
        for (const [i, [currentModule, currentName]] of imports.entries()) {
            if (module === currentModule && name === currentName) {
                imports[i].pop();
                return;
            }
        }
    };
    
    return result;
};
