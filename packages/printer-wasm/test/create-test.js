import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {readFileSync, writeFileSync} from 'node:fs';
import test from 'supertape';
import {print} from '#printer-wasm';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isUpdate = () => Boolean(process.env.UPDATE);

export const createTest = () => {
    return test.extend({
        transform: () => (name) => {
            const full = join(__dirname, '..', 'lib', 'fixture', name);
            const input = readFileSync(`${full}.js`, 'utf8');
            const code = print(input);
            
            if (isUpdate()) {
                writeFileSync(`${full}-fix.wast`, code);
                return {
                    is: true,
                    expected: code,
                    result: code,
                    message: 'fixed fixture updated',
                };
            }
            
            const fix = readFileSync(`${full}-fix.wast`, 'utf8');
            
            return {
                is: code === fix,
                expected: fix,
                result: code,
                message: 'should equal',
            };
        },
    });
};
