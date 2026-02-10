import {types, operator} from 'putout';
import {is8bit} from '@nirguna/operator-fasm/regs';
import {READ_SECTOR} from '../api.js';

export const report = () => `Use '0xff' instead of 'nemesis.readSector()'`;

const {isArrayExpression} = types;
const {extract} = operator;

export const match = () => ({
    'nemesis.readSector()': (vars, path) => {
        return path.parentPath.isExpressionStatement();
    },
});

export const replace = () => ({
    '__a = nemesis.readSector(__object)': ({__object, __a}, path) => {
        const {line} = path.node.loc.start;
        const reg = parseReg(__a.name);
        const {
            count = 1,
            buffer = 0,
            sector = 0,
            track = 0,
            disk = 0,
            head = 0,
        } = parseArgs(__object.properties);
        
        return `{
            ah = ${count};
            bx = ${buffer};
            cl = ${sector};
            ch = ${track};
            dl = ${disk};
            dh = ${head}; 
            ${createReadSector(line)}
            mov(__a, ${reg});
        }`;
    },
    '__a = nemesis.readSector()': ({__a}, path) => {
        const {line} = path.node.loc.start;
        const reg = parseReg(__a.name);
        
        return `{
            ${createReadSector(line)}
            mov(__a, ${reg});
        }`;
    },
    'nemesis.readSector()': (vars, path) => {
        const {line} = path.node.loc.start;
        return createReadSector(line);
    },
});

function createReadSector(line) {
    return `{
        al = ${READ_SECTOR};
        int(0x0ff);
        jnc(__nirguna_read_sector_ok_${line});
        al = 1;
        jmp(__nirguna_read_sector_end_${line});
        __nirguna_read_sector_ok_${line}:
        ax = 0
        __nirguna_read_sector_end_${line}:
        clc();
    }`;
}

function parseReg(name) {
    if (is8bit(name))
        return 'al';
    
    return 'ax';
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
