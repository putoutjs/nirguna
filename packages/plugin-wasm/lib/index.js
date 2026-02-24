import * as convertAwaitToCall from './convert-await-to-call/index.js';
import * as applyTypeToIf from './apply-type-to-if/index.js';
import * as applyLocalGet from './apply-local-get/index.js';
import * as applyEq from './apply-eq/index.js';
import * as applyI32Const from './apply-i32-const/index.js';
import * as applyWasmMemory from './apply-wasm-memory/index.js';
import * as convertExportMemoryToCall from './convert-export-memory-to-call/index.js';
import * as applyDataAddressType from './apply-data-address-type/index.js';
import * as convertStringToIdentifierInsideCall from './convert-string-to-identifier-inside-call/index.js';
import * as moveLocalOnTop from './move-local-on-top/index.js';
import * as convertConstToLocal from './convert-const-to-local/index.js';
import * as removeUselessIdentifierSuffix from './remove-useless-identifier-suffix/index.js';
import * as convertVarToConst from './convert-var-to-const/index.js';
import * as applyTypes from './apply-types/index.js';
import * as convertBinaryToCall from './convert-binary-to-call/index.js';
import * as removeUselessDeclarations from './remove-useless-declarations/index.js';
import * as applyWasmImport from './apply-wasm-import/index.js';

export const rules = {
    'apply-data-address-type': applyDataAddressType,
    'apply-wasm-import': applyWasmImport,
    'remove-useless-declarations': removeUselessDeclarations,
    'apply-types': applyTypes,
    'convert-binary-to-call': convertBinaryToCall,
    'convert-var-to-const': convertVarToConst,
    'remove-useless-identifier-suffix': removeUselessIdentifierSuffix,
    'convert-const-to-local': convertConstToLocal,
    'move-local-on-top': moveLocalOnTop,
    'convert-string-to-identifier-inside-call': convertStringToIdentifierInsideCall,
    'convert-export-memory-to-call': convertExportMemoryToCall,
    'apply-wasm-memory': applyWasmMemory,
    'apply-i32-const': applyI32Const,
    'apply-eq': applyEq,
    'apply-local-get': applyLocalGet,
    'apply-type-to-if': applyTypeToIf,
    'convert-await-to-call': convertAwaitToCall,
};
