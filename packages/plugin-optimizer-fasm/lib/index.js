import * as applyLodsb from './apply-lodsb/index.js';
import * as removeUselessXchg from './remove-useless-xchg/index.js';
import * as mergeLabelsOfDuplicateInstructions from './merge-labels-of-duplicate-instructions/index.js';
import * as removeUselessJmp from './remove-useless-jmp/index.js';
import * as removeUselessNop from './remove-useless-nop/index.js';
import * as removeUselessCondition from './remove-useless-condition/index.js';
import * as removeDuplicateOperations from './remove-duplicate-operations/index.js';
import * as joinOneByteRegistersAssign from './merge-one-byte-reg-assign/index.js';
import * as removeUselessMov from './remove-useless-mov/index.js';
import * as convertJzToJmp from './convert-jz-to-jmp/index.js';
import * as convertCmpToTest from './convert-cmp-to-test/index.js';
import * as removeUselessRet from './remove-useless-ret/index.js';
import * as convertMovToXor from './convert-mov-to-xor/index.js';

export const rules = {
    'apply-lodsb': applyLodsb,
    'convert-mov-to-xor': convertMovToXor,
    'remove-useless-ret': removeUselessRet,
    'convert-cmp-to-test': convertCmpToTest,
    'convert-jz-to-jmp': convertJzToJmp,
    'remove-useless-mov': removeUselessMov,
    'join-one-byte-registers-assign': joinOneByteRegistersAssign,
    'remove-duplicate-operations': removeDuplicateOperations,
    'remove-useless-condition': removeUselessCondition,
    'remove-useless-nop': removeUselessNop,
    'remove-useless-jmp': removeUselessJmp,
    'merge-labels-of-duplicate-instructions': mergeLabelsOfDuplicateInstructions,
    'remove-useless-xchg': removeUselessXchg,
};
