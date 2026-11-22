export type Place = {
    message: string;
    position: {
        line: number;
        column: number;
    };
};

export type CheckResult = [
    source: string,
    places: Place[],
];

export type CheckOptions = {
    isTS: boolean;
    allowed: Set<string>;
};

export function checkNodes(source: string, options: CheckOptions): CheckResult;
export function createChecker(options: CheckOptions): (source: string) => CheckResult;

