__nirguna_fasm_if_5: __nirguna_fasm_if_4: if (al === _backspace) {
    ah = await getColumn();
    al = await getMinColumn();
    if (ah !== al) {
        await __nirguna_decColumn();
        await __nirguna_decColumn();
        di -= 2;
    }
}
