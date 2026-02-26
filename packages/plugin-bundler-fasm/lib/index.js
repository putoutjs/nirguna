import * as applyAsync from './apply-async/index.js';
import * as applyDebug from './apply-debug/index.js';
import * as addUseDirective from './add-use-directive/index.js';
import * as replaceSectionDataWithLet from './replace-section-data-with-let/index.js';
import * as replaceSectionConstWithEqu from './replace-section-const-with-equ/index.js';
import * as replaceSectionCodeWithFunctions from './replace-section-code-with-functions/index.js';

export const rules = {
    'replace-section-code-with-functions': replaceSectionCodeWithFunctions,
    'replace-section-const-with-equ': replaceSectionConstWithEqu,
    'replace-section-data-with-let': replaceSectionDataWithLet,
    'add-use-directive': addUseDirective,
    'apply-debug': applyDebug,
    'apply-async': applyAsync,
};
