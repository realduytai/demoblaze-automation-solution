export function trimBreakLines(originString: string) {
    return originString.replace(/\n|\r/g, '');
}

export function trimSpaces(originalString: any): string {
    return originalString.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
}