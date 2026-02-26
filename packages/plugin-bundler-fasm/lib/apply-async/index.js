export const report = () => `Use 'async'`;

export const include = () => ['FunctionDeclaration'];

export const fix = (path) => {
    path.node.async = true;
};

export const filter = (path) => !path.node.async;
