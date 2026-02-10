import {parseArgs, SET_COLOR} from '../api.js';

const GREEN = 2;
const BLACK = 0;
const RED = 12;
const WHITE = 15;
const YELLOW = 14;

const prepareColor = (color) => {
    if (color === 'red')
        return RED;
    
    if (color === 'white')
        return WHITE;
    
    if (color === 'yellow')
        return YELLOW;
    
    return color;
};

export const report = () => `Use '0xff' instead of 'nemesis.setColor()'`;

export const replace = () => ({
    'nemesis.setColor()': () => {
        return `{
        	cl = ${GREEN}
            ch = ${BLACK};
            al = 6;
            int(0xff);
        }`;
    },
    'nemesis.setColor(__object)': ({__object}) => {
        const {
            color = GREEN,
            background = BLACK,
        } = parseArgs(__object);
        
        const preparedColor = prepareColor(color);
        const preparedBackground = prepareColor(background);
        
        return `{
        	cl = ${preparedColor}
            ch = ${preparedBackground};
            al = ${SET_COLOR};
            int(0xff);
        }`;
    },
});
