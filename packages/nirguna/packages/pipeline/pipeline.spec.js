import {test} from 'supertape';
import {tryToCatch} from 'try-to-catch';
import {createPipeline} from '#pipeline';

const NAMES = [
    'inflate',
    'transform',
    'optimize',
    'print',
    'translate',
];

const place = {
    message: 'broken',
    position: {
        line: 1,
        column: 2,
    },
};

const createStage = (name, places = []) => ({
    [name]: (source) => [
        `${source}.${name}`,
        places,
    ],
}[name]);

const createStages = (places = {}) => NAMES.map((name) => createStage(name, places[name]));

test('nirguna: pipeline: run stages in order', async (t) => {
    const run = createPipeline(createStages());
    const result = await run('s');
    
    const expected = [
        's.inflate.transform.optimize.print.translate',
        [],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: pipeline: no options', async (t) => {
    const run = createPipeline(createStages());
    const [result] = await run('s');
    
    t.equal(result, 's.inflate.transform.optimize.print.translate');
    t.end();
});

test('nirguna: pipeline: events', async (t) => {
    const run = createPipeline(createStages());
    const result = [];
    const onStageChange = (a, b) => result.push([a, b]);
    
    await run('s', {
        onStageChange,
    });
    
    const expected = [
        ['inflate', {
            last: false,
            places: [],
        }],
        ['transform', {
            last: false,
            places: [],
        }],
        ['optimize', {
            last: false,
            places: [],
        }],
        ['print', {
            last: false,
            places: [],
        }],
        ['translate', {
            last: true,
            places: [],
        }],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: pipeline: pass options to a stage', async (t) => {
    const result = [];
    const inflate = (source, options) => {
        result.push(options);
        return [
            source,
            [],
        ];
    };
    
    const run = createPipeline([inflate]);
    
    const options = {
        name: 'hello',
    };
    
    await run('s', options);
    const expected = [options];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: pipeline: await a stage', async (t) => {
    const translate = async (source) => [
        `${source}.translate`,
        [],
    ];
    
    const run = createPipeline([translate]);
    const [result] = await run('s');
    
    t.equal(result, 's.translate');
    t.end();
});

test('nirguna: pipeline: type: code', async (t) => {
    const run = createPipeline(createStages());
    const result = [];
    const onStageChange = (a, b) => result.push([a, b.last]);
    
    const [code] = await run('s', {
        type: 'code',
        onStageChange,
    });
    
    const expected = ['s.inflate.transform', [
        ['inflate', false],
        ['transform', true],
    ]];
    
    t.deepEqual([code, result], expected);
    t.end();
});

test('nirguna: pipeline: type: optimized', async (t) => {
    const run = createPipeline(createStages());
    const [result] = await run('s', {
        type: 'optimized',
    });
    
    t.equal(result, 's.inflate.transform.optimize');
    t.end();
});

test('nirguna: pipeline: type: assembly', async (t) => {
    const run = createPipeline(createStages());
    const result = [];
    const onStageChange = (a, b) => result.push([a, b.last]);
    
    const [assembly] = await run('s', {
        type: 'assembly',
        onStageChange,
    });
    
    const expected = ['s.inflate.transform.optimize.print', ['print', true]];
    
    t.deepEqual([assembly, result.at(-1)], expected);
    t.end();
});

test('nirguna: pipeline: type: binary', async (t) => {
    const run = createPipeline(createStages());
    const [result] = await run('s', {
        type: 'binary',
    });
    
    t.equal(result, 's.inflate.transform.optimize.print.translate');
    t.end();
});

test('nirguna: pipeline: type: dump', async (t) => {
    const run = createPipeline(createStages());
    const [result] = await run('s', {
        type: 'dump',
    });
    
    t.equal(result, 's.inflate.transform.optimize.print.translate');
    t.end();
});

test('nirguna: pipeline: type: unknown', async (t) => {
    const run = createPipeline(createStages());
    const [result] = await run('s', {
        type: 'hello',
    });
    
    t.equal(result, 's.inflate.transform.optimize.print.translate');
    t.end();
});

test('nirguna: pipeline: the last stage is the last event: stop is not in the list', async (t) => {
    const run = createPipeline(
        createStages().slice(0, 3),
    );
    
    const result = [];
    const onStageChange = (a, b) => result.push([a, b.last]);
    
    await run('s', {
        type: 'binary',
        onStageChange,
    });
    const expected = ['optimize', true];
    
    t.deepEqual(result.at(-1), expected);
    t.end();
});

test('nirguna: pipeline: places of inflate stop the pipeline', async (t) => {
    const run = createPipeline(createStages({
        inflate: [place],
    }));
    
    const result = await run('s');
    const expected = ['s.inflate', [place]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: pipeline: places of transform: events', async (t) => {
    const run = createPipeline(createStages({
        transform: [place],
    }));
    
    const result = [];
    const onStageChange = (a, b) => result.push([a, b]);
    
    await run('s', {
        onStageChange,
    });
    
    const expected = [
        ['inflate', {
            last: false,
            places: [],
        }],
        ['transform', {
            last: true,
            places: [place],
        }],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: pipeline: places of translate', async (t) => {
    const run = createPipeline(createStages({
        translate: [place],
    }));
    
    const result = await run('s');
    const expected = ['s.inflate.transform.optimize.print.translate', [place]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: pipeline: places of optimize are dropped when optimize is not the stop', async (t) => {
    const run = createPipeline(createStages({
        optimize: [place],
    }));
    
    const expected = [];
    
    const [, result] = await run('s', {
        type: 'binary',
    });
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: pipeline: places of optimize are dropped: event', async (t) => {
    const run = createPipeline(createStages({
        optimize: [place],
    }));
    
    const result = [];
    const onStageChange = (a, b) => result.push([a, b]);
    
    await run('s', {
        type: 'binary',
        onStageChange,
    });
    
    t.deepEqual(result[2], ['optimize', {
        last: false,
        places: [],
    }]);
    t.end();
});

test('nirguna: pipeline: places of optimize are returned when optimize is the stop', async (t) => {
    const run = createPipeline(createStages({
        optimize: [place],
    }));
    
    const result = await run('s', {
        type: 'optimized',
    });
    
    const expected = ['s.inflate.transform.optimize', [place]];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: pipeline: optimization: true', async (t) => {
    const run = createPipeline(createStages());
    const [result] = await run('s', {
        optimization: true,
    });
    
    t.equal(result, 's.inflate.transform.optimize.print.translate');
    t.end();
});

test('nirguna: pipeline: optimization: false: skip optimize', async (t) => {
    const run = createPipeline(createStages());
    const [result] = await run('s', {
        optimization: false,
    });
    
    t.equal(result, 's.inflate.transform.print.translate');
    t.end();
});

test('nirguna: pipeline: optimization: false: event of optimize', async (t) => {
    const run = createPipeline(createStages());
    const result = [];
    const onStageChange = (a, b) => result.push([a, b]);
    
    await run('s', {
        optimization: false,
        onStageChange,
    });
    
    t.deepEqual(result[2], ['optimize', {
        last: false,
        places: [],
    }]);
    t.end();
});

test('nirguna: pipeline: optimization: false: type: optimized', async (t) => {
    const run = createPipeline(createStages());
    const result = await run('s', {
        optimization: false,
        type: 'optimized',
    });
    
    const expected = [
        's.inflate.transform',
        [],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: pipeline: no stages', async (t) => {
    const run = createPipeline([]);
    const result = await run('s');
    
    const expected = [
        's',
        [],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: pipeline: stop: name of a stage', async (t) => {
    const run = createPipeline(createStages());
    const result = await run('s', {
        stop: 'transform',
    });
    
    const expected = [
        's.inflate.transform',
        [],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: pipeline: stop: the last event', async (t) => {
    const run = createPipeline(createStages());
    const result = [];
    const onStageChange = (a, b) => result.push([a, b.last]);
    
    await run('s', {
        stop: 'inflate',
        onStageChange,
    });
    
    const expected = [
        ['inflate', true],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: pipeline: stop: wins over type', async (t) => {
    const run = createPipeline(createStages());
    const [result] = await run('s', {
        type: 'binary',
        stop: 'inflate',
    });
    
    t.equal(result, 's.inflate');
    t.end();
});

test('nirguna: pipeline: stop: the last stage', async (t) => {
    const run = createPipeline(createStages());
    const [result] = await run('s', {
        stop: 'translate',
    });
    
    t.equal(result, 's.inflate.transform.optimize.print.translate');
    t.end();
});

test('nirguna: pipeline: stop: unknown stage', async (t) => {
    const run = createPipeline(createStages());
    const [error] = await tryToCatch(run, 's', {
        stop: 'check',
    });
    
    t.equal(error.message, `Unknown stage 'check'`);
    t.end();
});

test('nirguna: pipeline: stop: unknown stage: no stage runs', async (t) => {
    const run = createPipeline(createStages());
    const result = [];
    const onStageChange = result.push.bind(result);
    
    await tryToCatch(run, 's', {
        stop: 'check',
        onStageChange,
    });
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});
