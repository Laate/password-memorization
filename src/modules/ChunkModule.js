

export function getChunks(word, chunkSize=3) {
    const res = [];

    function inner(string, isLeft) {
        if (string.length <= chunkSize) {
            isLeft ? res.push({left: string, right: ""}) : res.push({left: "", right: string});
            return
        } else if (string.length < chunkSize * 2) {
            // We want to keep the chunk sizes as even as possible. So if the word length isn't divisible by chunkSize,
            // we merge the remainder with the last chunk and split it in two. This way minimum chunkSize is
            // (chunkSize + 1) / 2 instead of 1
            const cMid = Math.ceil(string.length / 2);
            const cLeft = string.slice(0, cMid);
            const cRight = string.slice(cMid);
            res.push({left: cLeft, right: cRight}, {left: "", right: cRight}, {left: cLeft, right: ""});
            return
        }

        const nofChunks = Math.floor(string.length/chunkSize);
        const mid = (Math.floor(nofChunks / 2) + (nofChunks % 2)) * chunkSize;
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

export function getChunksSequential(word, chunkSize=3) {
    const regex = new RegExp(`.{1,${chunkSize}}`, "g");
    const chunks = word.match(regex);

    const res = [];
    for (let i = 1; i <= chunks.length; i++) {
        const left = chunks.slice(0, i-1).join("");
        const right = chunks.slice(i-1, i).join("");
        res.push({left: left, right: right})
    }

    return res
}
