import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {readFileSync, writeFileSync} from 'node:fs';
import process from 'node:process';
import test from 'supertape';
import {print} from '#printer-wasm';
import {
    lintWastFormatting,
    createReport,
} from './lint-wast-formatting.js';

const isUpdate = () => Boolean(process.env.UPDATE);

export const createTest = (url) => {
    return test.extend({
        transform: ({pass, equal, fail}) => (name) => {
            const dir = dirname(fileURLToPath(url));
            const full = join(dir, 'fixture', name);
            const input = readFileSync(`${full}.js`, 'utf8');
            const result = print(input);
            
            if (isUpdate()) {
                writeFileSync(`${full}-fix.wast`, result);
                return pass('update fixture');
            }
            
            const expected = readFileSync(`${full}-fix.wast`, 'utf8');
            const formatIssues = lintWastFormatting(result);
            
            if (formatIssues.length) {
                const fixturePath = `${full}-fix.wast`;
                const report = createReport(fixturePath, result, formatIssues);
                
                return fail(`formatting issues in ${name}:\n\n${report}`);
            }
            
            return equal(result, expected);
        },
    });
};
