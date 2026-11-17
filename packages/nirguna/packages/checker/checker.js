import {parse, traverse} from 'putout';
import {tryCatch} from 'try-catch';

const EXCERPT_LENGTH = 40;

const toExcerpt = (source, {start, end}) => source
    .slice(start, end)
    .split('\n')[0]
    .slice(0, EXCERPT_LENGTH);

const toPlace = (source, node) => ({
    message: `Unsupported '${node.type}': ${toExcerpt(source, node)}`,
    position: {
        line: node.loc.start.line,
        column: node.loc.start.column,
    },
});

const toErrorPlace = ({message, loc}) => ({
    message,
    position: {
        line: loc.line,
        column: loc.column,
    },
});

const createVisitor = ({source, allowed, places}) => ({
    enter(path) {
        if (allowed.has(path.node.type))
            return;
        
        places.push(toPlace(source, path.node));
        path.skip();
    },
});

export const checkNodes = (source, {isTS, allowed}) => {
    const [error, ast] = tryCatch(parse, source, {
        isTS,
    });
    
    if (error)
        return [
            source,
            [
                toErrorPlace(error),
            ],
        ];
    
    const places = [];
    
    traverse(ast, createVisitor({
        source,
        allowed,
        places,
    }));
    
    return [source, places];
};
