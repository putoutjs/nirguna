import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {readFileSync, writeFileSync} from 'node:fs';
import process from 'node:process';
import test from 'supertape';
import {print} from '#printer-wasm';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isUpdate = () => Boolean(process.env.UPDATE);

export const createTest = () => {
    return test.extend({
        transform: ({pass, equal}) => (name) => {
            const full = join(__dirname, '..', 'lib', 'fixture', name);
            const input = readFileSync(`${full}.js`, 'utf8');
            const result = print(input);
            
            if (isUpdate()) {
                writeFileSync(`${full}-fix.wast`, result);
                return pass('update fixture');
            }
            
            const expected = readFileSync(`${full}-fix.wast`, 'utf8');
            
            return equal(result, expected);
        },
    });
};
