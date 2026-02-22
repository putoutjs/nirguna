import {template} from 'putout';

const createBinary = (address) => `{
    org(${address});
    use16();
}`;

const TARGET = {
    boot: createBinary('0x7c00'),
    kernel: createBinary('0x7e00'),
    nemesis: createBinary('0x500'),
    linux: `{
        format.ELF64.executable;
        entry.$;
    }`,
};

export const report = (path, {target}) => `Insert target: '${target}'`;

export const fix = (path, {target = 'boot'}) => {
    path.node.extra.target = target;
    path.node.body.unshift(template.ast(TARGET[target]));
};

export const include = () => ['Program'];

export const filter = (path, {options}) => {
    const {target} = options;
    
    if (!target)
        return;
    
    if (path.node.extra.target)
        return;
    
    return TARGET[target];
};
