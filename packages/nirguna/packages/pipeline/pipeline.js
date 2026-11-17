const noop = () => {};

const STOP_AT = {
    code: 'transform',
    optimized: 'optimize',
    assembly: 'print',
    binary: 'translate',
    dump: 'translate',
};

const identity = (source) => [
    source,
    [],
];

const getStop = ({type = 'binary', stop}) => stop || STOP_AT[type] || 'translate';

const hasStage = (stages, stop) => stages.some(({name}) => name === stop);

const assertStop = (stages, {stop}) => {
    if (stop && !hasStage(stages, stop))
        throw Error(`Unknown stage '${stop}'`);
};

const isSkipped = ({name}, {optimization = true}) => name === 'optimize' && !optimization;

const filterPlaces = (name, stop, places) => {
    if (name === 'optimize' && name !== stop)
        return [];
    
    return places;
};

export const createPipeline = (stages) => async (source, options = {}) => {
    const {
        onStageChange = noop,
    } = options;
    
    assertStop(stages, options);
    
    const stop = getStop(options);
    
    let value = source;
    
    for (const [index, stage] of stages.entries()) {
        const {name} = stage;
        const run = isSkipped(stage, options) ? identity : stage;
        const [next, found] = await run(value, options);
        const places = filterPlaces(name, stop, found);
        const last = name === stop || index === stages.length - 1 || places.length > 0;
        
        onStageChange(name, {
            last,
            places: last ? places : [],
        });
        
        if (last)
            return [next, places];
        
        value = next;
    }
    
    return [
        source,
        [],
    ];
};
