import * as insertTarget from './insert-target/index.js';
import * as removeUselessPromise from './remove-useless-promise/index.js';
import * as applyInclude from './apply-include/index.js';
import * as switchCmpOperands from './switch-cmp-operands/index.js';
import * as splitBinaryExpression from './split-binary-expression/index.js';
import * as convertLinuxExitToSyscall from './convert-linux-exit-to-syscall/index.js';
import * as convertLinuxWriteToSyscall from './convert-linux-write-to-syscall/index.js';
import * as convertWhileToJz from './convert-while-to-jz/index.js';
import * as convertUregToReg from './convert-ureg-to-reg/index.js';
import * as convertConstToEqu from './convert-const-to-equ/index.js';
import * as removeUselessBraces from './remove-useless-braces/index.js';
import * as applyRegisters from './apply-registers/index.js';
import * as convertAssignToOr from './convert-assign-to-or/index.js';
import * as convertAssignToAnd from './convert-assign-to-and/index.js';
import * as applyTypes from './apply-types/index.js';
import * as convertArgsToRegs from './convert-args-to-regs/index.js';
import * as convertTernaryToIf from './convert-ternary-to-if/index.js';
import * as convertStrncmpToRepeCmpsb from './convert-strncmp-to-repe-cmpsb/index.js';
import * as convertBiosRebootToJmpFar from './convert-bios-reboot-to-jmp-far/index.js';
import * as convertBiosReadSectorToInt13 from './convert-bios-read-sector-to-int-13/index.js';
import * as convertBiosReadCharToInt16 from './convert-bios-read-char-to-int-16/index.js';
import * as convertBiosScrollToInt10 from './convert-bios-scroll-to-int-10/index.js';
import * as splitAssignAwaitWithAssignEax from './split-assign-await-with-assign-eax/index.js';
import * as convertDoWhileToJnz from './convert-do-while-to-jnz/index.js';
import * as convertBiosPrintLineToInt10 from './convert-bios-print-line-to-int-10/index.js';
import * as convertBiosClearScreenToInt10 from './convert-bios-clear-screen-to-int-10/index.js';
import * as convertAssignToSub from './convert-assign-to-sub/index.js';
import * as applyEquality from './apply-equality/index.js';
import * as extractLabeledBlock from './extract-labeled-block/index.js';
import * as convertIfToJmp from './convert-if-to-jmp/index.js';
import * as removeUselessDeclarations from './remove-useless-declarations/index.js';
import * as addLabelPrefix from './add-label-prefix/index.js';
import * as convertDeclarationToToMov from './convert-declaration-to-mov/index.js';
import * as convertMovToAdd from './convert-mov-to-add/index.js';
import * as convertReturnToEax from './convert-return-to-eax/index.js';
import * as applyInc from './apply-inc/index.js';
import * as convEquCallToMember from './convert-equ-call-to-member/index.js';
import * as convertDecToHex from './convert-dec-to-hex/index.js';
import * as convertAssignToMember from './convert-assign-to-member/index.js';
import * as convertAssignToAdd from './convert-assign-to-add/index.js';
import * as convertAssignToMov from './convert-assign-to-mov/index.js';
import * as convertAssignToXor from './convert-assign-to-xor/index.js';
import * as convertAssignToShl from './convert-assign-to-shl/index.js';
import * as convertAwaitToCall from './convert-await-to-call/index.js';
import * as splitStackOperations from './split-stack-operations/index.js';
import * as convertFunctionToLabel from './convert-function-to-label/index.js';

export const rules = {
    'apply-types': applyTypes,
    'convert-dec-to-hex': convertDecToHex,
    'convert-equ-call-to-member': convEquCallToMember,
    'convert-assign-to-member': convertAssignToMember,
    'convert-assign-to-add': convertAssignToAdd,
    'convert-assign-to-mov': convertAssignToMov,
    'convert-assign-to-xor': convertAssignToXor,
    'convert-assign-to-shl': convertAssignToShl,
    'convert-function-to-label': convertFunctionToLabel,
    'convert-await-to-call': convertAwaitToCall,
    'split-stack-operations': splitStackOperations,
    'apply-inc': applyInc,
    'convert-return-to-eax': convertReturnToEax,
    'convert-mov-to-add': convertMovToAdd,
    'convert-declaration-to-mov': convertDeclarationToToMov,
    'add-label-prefix': addLabelPrefix,
    'remove-useless-declarations': removeUselessDeclarations,
    'convert-if-to-jmp': convertIfToJmp,
    'extract-labeled-block': extractLabeledBlock,
    'apply-equality': applyEquality,
    'convert-assign-to-sub': convertAssignToSub,
    'convert-bios-clear-screen-to-int-10': convertBiosClearScreenToInt10,
    'convert-bios-print-line-to-int-10': convertBiosPrintLineToInt10,
    'convert-do-while-to-jnz': convertDoWhileToJnz,
    'split-assign-await-with-assign-eax': splitAssignAwaitWithAssignEax,
    'convert-bios-scroll-to-int-10': convertBiosScrollToInt10,
    'convert-bios-read-char-to-int-16': convertBiosReadCharToInt16,
    'convert-bios-read-sector-to-int-13': convertBiosReadSectorToInt13,
    'convert-bios-reboot-to-jmp-far': convertBiosRebootToJmpFar,
    'convert-strncmp-to-repe-cmpsb': convertStrncmpToRepeCmpsb,
    'convert-ternary-to-if': convertTernaryToIf,
    'convert-args-to-regs': convertArgsToRegs,
    'convert-assign-to-and': convertAssignToAnd,
    'convert-assign-to-or': convertAssignToOr,
    'apply-registers': applyRegisters,
    'remove-useless-braces': removeUselessBraces,
    'convert-const-to-equ': convertConstToEqu,
    'convert-ureg-to-reg': convertUregToReg,
    'convert-while-to-jz': convertWhileToJz,
    'convert-linux-write-to-syscall': convertLinuxWriteToSyscall,
    'convert-linux-exit-to-syscall': convertLinuxExitToSyscall,
    'split-binary-expression': splitBinaryExpression,
    'switch-cmp-operands': switchCmpOperands,
    'apply-include': applyInclude,
    'remove-useless-promise': removeUselessPromise,
    'insert-target': insertTarget,
};
