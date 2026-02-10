import {types} from 'putout';

const {isIdentifier} = types;

export const report = () => `Use 'nemesis.printf()' instead of 'debug()'`;

export const match = () => ({
    'debug(__a)': ({__a}) => isIdentifier(__a),
});

export const replace = ({options}) => {
    const {
        color = 4,
        background = 0,
    } = options;
    
    return {
        'debug(__a)': `{
            pusha();
            nemesis.setColor({
                color: ${color},
                background: ${background},
            });
            nemesis.printf(__a);
            nemesis.setColor();
            popa();
        }`,
    };
};
