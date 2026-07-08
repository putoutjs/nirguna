export const report = () => 'indent';
export const check = (line) => line.match(/(?<=\S) {2,}/);
