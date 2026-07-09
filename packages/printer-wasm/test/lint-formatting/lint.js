import * as indent from './rules/indent.js';
import * as blankLine from './rules/blank-line.js';
import * as trailingSpace from './rules/trailing-space.js';
import * as missingIndent from './rules/missing-indent.js';

const rules = [
    indent,
    trailingSpace,
    blankLine,
    missingIndent,
];

export const lint = (text) => {
    const issues = [];
    const lines = text.split('\n');
    
    for (const [i, line] of lines.entries()) {
        const next = lines[i + 1];
        const context = {
            isFirstLine: !i,
            isLastLine: i === lines.length - 1,
        };
        
        for (const rule of rules) {
            const position = rule.check(line, next, context);
            
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
