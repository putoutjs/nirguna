import {pathToFileURL} from 'node:url';
import {codeFrameColumns} from '@putout/babel';

export function report(fixturePath, source, formatIssues) {
    const result = [];
    
    for (const {line, column, message} of formatIssues) {
        const url = `${pathToFileURL(fixturePath).href}:${line}:${column}`;
        const frame = codeFrameColumns(source, {
            start: {
                line,
                column,
            },
        }, {
            message,
        });
        
        result.push(`${url}\n${frame}`);
    }
    
    return result.join('\n\n');
}

