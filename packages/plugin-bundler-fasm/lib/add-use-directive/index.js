import {types} from 'putout';

const {
    directive,
    directiveLiteral,
} = types;

export const report = () => `Use 'use' directive'`;

export const filter = (path) => {
    const programPath = path.scope.getProgramParent().path;
    return !programPath.node.directives.length;
};

export const replace = () => ({
    'format.ELF64.executable': createDirective('use 64'),
    'use16()': createDirective('use 16'),
});

const createDirective = (name) => (vars, path) => {
    const programPath = path.scope.getProgramParent().path;
    const literal = directiveLiteral(name);
    
    programPath.node.directives = [
        directive(literal),
    ];
    
    return path;
};
