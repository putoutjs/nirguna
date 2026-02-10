const readFileSyncStub = () => '';

export const report = () => `Apply 'include'`;

export const replace = ({options}) => {
    const {
        readFileSync = readFileSyncStub,
    } = options;
    
    return {
        'include(__a)': ({__a}) => {
            const result = readFileSync(__a.value, 'utf8');
            
            return `include\`\n   ${result}\n\``;
        },
    };
};
