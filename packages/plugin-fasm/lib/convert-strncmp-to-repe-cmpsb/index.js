export const report = () => `Use 'repe.cmbsp()' instead of 'strncmp()'`;

export const match = () => ({
    'strncmp(__a, __b, __c)': (vars, path) => {
        return path.parentPath.isExpressionStatement();
    },
});

export const replace = () => ({
    '__a = strncmp(__b, __c, __d)': `{
        mov(cx, __d);
        si = __b;
    	di =__c 
        repe.cmpsb();
        mov(__a, cx);
    }`,
    'strncmp(__a, __b, __c)': `{
        mov(cx, __c);
        si = __a;
    	di =__b 
        repe.cmpsb();
    }`,
});
