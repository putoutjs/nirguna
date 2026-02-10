import * as applyEqz from './apply-eqz/index.js';
import * as removeUselessIf from './remove-useless-if/index.js';
import * as removeUselessReturn from './remove-useless-return/index.js';

export const rules = {
    'remove-useless-return': removeUselessReturn,
    'remove-useless-if': removeUselessIf,
    'apply-eqz': applyEqz,
};
