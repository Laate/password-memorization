
export function getChunkTree(word, chunkSize=3) {
    if (word.length < chunkSize * 2) {
        return {
            leftText: word,
            rightText: "",
        }
    }

    const nofChunks = Math.floor(word.length / chunkSize);
    const mid = (Math.floor(nofChunks / 2) + (nofChunks % 2)) * chunkSize;
    const left = word.slice(0, mid);
    const right = word.slice(mid);

    return {
        leftText: left,
        rightText: right,
        left: [getChunkTree(left, chunkSize)],
        right: [getChunkTree(right, chunkSize)]
    }
}
