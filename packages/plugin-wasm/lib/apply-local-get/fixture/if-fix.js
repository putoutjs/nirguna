export const compare = (eax) => {
    if (local.get(eax))
        return 1;
    
    return 0;
};
