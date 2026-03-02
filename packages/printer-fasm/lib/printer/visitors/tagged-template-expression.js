export const TaggedTemplateExpression = (path, {write}) => {
    const {value} = path.node.quasi.quasis[0];
    write(value.cooked.trim());
};
