import {Func} from './func/func.js';
import {Memory} from './memory/memory.js';
import {Data} from './data/data.js';
import {ModuleImport} from './module-import/module-import.js';
import {ModuleExport} from './module-export/module-export.js';
import {Global} from './global/global.js';
import {Start} from './start/start.js';

export const visitors = {
    Func,
    Memory,
    Data,
    ModuleImport,
    ModuleExport,
    Global,
    Start,
};
