
export function chunkTree(word, chunkSize=3) {
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
        left: [chunkTree(left, chunkSize)],
        right: [chunkTree(right, chunkSize)]
    }
}

export function randomWord(length) {
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    let res = "";
    for (let i = 0; i < length; i++) {
        res += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return res
}
