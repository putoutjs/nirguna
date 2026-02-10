import helpList from './help.json' with {
    type: 'json',
};

const {entries} = Object;

export const help = () => {
    const result = [
        'Usage: nirguna [options] [input]',
        'Options:',
    ];
    
    for (const [name, description] of entries(helpList)) {
        result.push(`  ${name} ${description}`);
    }
    
    return result.join('\n');
};
