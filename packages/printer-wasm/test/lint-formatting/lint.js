import * as indent from './rules/indent.js';
import * as blankLine from './rules/blank-line.js';
import * as trailingSpace from './rules/trailing-space.js';

const rules = [indent, trailingSpace, blankLine];

export const lint = (text) => {
    const issues = [];
    const lines = text.split('\n');
    
    for (const [i, line] of lines.entries()) {
        for (const rule of rules) {
            const next = lines[i + 1];
            const position = rule.check(line, next);
            
            if (position)
                issues.push({
                    line: i + 1,
                    column: position.index + 1,
                    message: rule.report(),
                });
        }
    }
    
    return issues;
};

