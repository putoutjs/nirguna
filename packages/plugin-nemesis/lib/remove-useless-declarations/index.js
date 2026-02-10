export const report = () => `Avoid useless import of '@nirguna/operator-nemesis'`;

export const replace = () => ({
    'import __imports from "@nirguna/operator-nemesis"': '',
});
