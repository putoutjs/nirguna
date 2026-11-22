import {createPipeline} from '#pipeline';

export const defineBackend = ({name, options, stages, targets = {}}) => ({
    name,
    options,
    stages,
    targets,
    compile: createPipeline(stages),
});
