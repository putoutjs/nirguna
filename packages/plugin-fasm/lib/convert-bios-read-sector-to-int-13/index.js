import {operator, types} from 'putout';

const {isArrayExpression} = types;
const {extract} = operator;

export const report = () => `Use '0x13' instead of 'bios.readSector()'`;

export const match = () => ({
    'bios.readSector()': (vars, path) => {
        return path.parentPath.isExpressionStatement();
    },
});

export const replace = () => ({
    '__a = bios.readSector(__object)': ({__object}, path) => {
        const {line} = path.node.loc.start;
        const {
            count = 1,
            buffer = 0,
            sector = 0,
            track = 0,
            disk = 0,
            head = 0,
        } = parseArgs(__object.properties);
        
        return `{
            al = ${count};
            bx = ${buffer};
            cl = ${sector};
            ch = ${track};
            dl = ${disk};
            dh = ${head}; 
            ${createReadSector(line)}
            mov(__a, ax);
        }`;
    },
    '__a = bios.readSector()': (vars, path) => {
        const {line} = path.node.loc.start;
        
        return `{
            ${createReadSector(line)}
            mov(__a, ax);
        }`;
    },
    'bios.readSector()': (vars, path) => {
        const {line} = path.node.loc.start;
        return createReadSector(line);
    },
});

function createReadSector(line) {
    return `{
        ah = 2;
        int(0x13);
        jnc(__nirguna_read_sector_ok_${line});
        al = 1;
        jmp(__nirguna_read_sector_end_${line});
        __nirguna_read_sector_ok_${line}:
        ax = 0
        __nirguna_read_sector_end_${line}:
        clc();
    }`;
}

function parseArgs(properties) {
    const result = {};
    
    for (const {key, value} of properties) {
        const extracted = extract(value);
        
        if (isArrayExpression(value)) {
            result[key.name] = `[${extracted}]`;
            continue;
        }
        
        result[key.name] = extracted;
    }
    
    return result;
}
