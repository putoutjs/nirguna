import * as convertGetCharToInt0xff from './convert-get-char-to-int-0xff/index.js';
import * as removeUselessDeclarations from './remove-useless-declarations/index.js';
import * as convertFindFirstToInt0xff from './convert-find-first-to-int-0xff/index.js';
import * as convertClearScreenToInt0xff from './convert-clear-screen-to-int-0xff/index.js';
import * as convertGetsTo0xff from './convert-gets-to-0xff/index.js';
import * as convertSetScreenSizeTo0xff from './convert-set-screen-size-to-0xff/index.js';
import * as convertSetColorTo0xff from './convert-set-color-to-0xff/index.js';
import * as convertDebugToPrintf from './convert-debug-to-printf/index.js';
import * as convertFindFileToInt0xff from './convert-find-file-to-int-0xff/index.js';
import * as convertReadSectorToInt0xff from './convert-read-sector-to-int-0xff/index.js';
import * as convertExecToInt0xff from './convert-exec-to-int-0xff/index.js';
import * as convertSetCursorToInt0xff from './convert-set-cursor-to-int-0xff/index.js';
import * as removeUselessImports from './remove-useless-imports/index.js';
import * as convertPrintfToInt0xff from './convert-printf-to-int-0xff/index.js';

export const rules = {
    'convert-printf-to-int-0xff': convertPrintfToInt0xff,
    'remove-useless-imports': removeUselessImports,
    'convert-set-cursor-to-int-0xff': convertSetCursorToInt0xff,
    'convert-exec-to-int-0xff': convertExecToInt0xff,
    'convert-read-sector-to-int-0xff': convertReadSectorToInt0xff,
    'convert-find-file-to-int-0xff': convertFindFileToInt0xff,
    'convert-debug-to-printf': convertDebugToPrintf,
    'convert-set-color-to-0xff': convertSetColorTo0xff,
    'convert-set-screen-size-to-0xff': convertSetScreenSizeTo0xff,
    'convert-gets-to-0xff': convertGetsTo0xff,
    'convert-clear-screen-to-int-0xff': convertClearScreenToInt0xff,
    'convert-find-first-to-int-0xff': convertFindFirstToInt0xff,
    'remove-useless-declarations': removeUselessDeclarations,
    'convert-get-char-to-int-0xff': convertGetCharToInt0xff,
};
