

export function getChunks(word, chunkSize=3) {
    const res = [];

    function inner(string, isLeft) {
        if (string.length <= chunkSize) {
            isLeft ? res.push({left: string, right: ""}) : res.push({left: "", right: string});
            return
        }
        
        const mid = Math.ceil((string.length/chunkSize) / 2) * chunkSize;
        const left = string.slice(0, mid);
        const right = string.slice(mid);

        res.push({left: left, right: right});

        inner(right, false);
        inner(left, true);
    }

    inner(word, true);
    // The result is built from top down so we reverse to get the correct order
    return res.reverse()
}
