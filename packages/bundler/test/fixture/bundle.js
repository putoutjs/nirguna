import {join, dirname} from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import {bundle} from '../../lib/bundler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const [, , name] = process.argv;

await bundle(join(__dirname, name));
