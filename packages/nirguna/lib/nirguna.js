import {resolve} from '#backends';

export const compile = async (source, options) => {
    const [backend, backendOptions] = resolve(options);
    
    return await backend.compile(source, backendOptions);
};
