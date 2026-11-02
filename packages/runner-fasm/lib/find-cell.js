const COLUMNS = 80;

const hasText = (needle, line) => line.includes(needle);

export const findCell = (text, needle) => {
    const lines = text.split('\n');
    const row = lines.findIndex(hasText.bind(null, needle));
    
    if (row === -1)
        return -1;
    
    return row * COLUMNS + lines[row].indexOf(needle);
};
