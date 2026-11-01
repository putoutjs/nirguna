import {
    template,
    types,
} from 'putout';
import {
    getFacts,
    hasFacts,
    parseFacts,
    removeFacts,
} from '../facts.js';

const {
    tsTypeAnnotation,
    tsTypeReference,
    identifier,
} = types;

export const report = () => `Apply: registers`;

export const include = () => ['FunctionDeclaration'];

export const filter = (path) => hasFacts(path) && parseFacts(getFacts(path));

const createBody = ({shape, names}) => {
    let text = shape.body;
    
    for (const [i, placeholder] of shape.parameters.entries()) {
        text = text.replaceAll(placeholder, names[i]);
    }
    
    return template.ast.fresh(text);
};

export const fix = (path) => {
    const facts = parseFacts(getFacts(path));
    
    removeFacts(path);
    path.node.body = createBody(facts);
    path.node.async = true;
    
    if (facts.shape.returnType)
        path.node.returnType = tsTypeAnnotation(tsTypeReference(identifier('ureg')));
};
