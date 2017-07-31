
export function chunkTree(word, chunkSize) {
    if (word.length < chunkSize * 2) {
        return { text: word }
    }

    const nofChunks = Math.floor(word.length / chunkSize);
    const mid = (Math.floor(nofChunks / 2) + (nofChunks % 2)) * chunkSize;

    return {
        text: word,
        left: [chunkTree(word.slice(0, mid), chunkSize)],
        right: [chunkTree(word.slice(mid), chunkSize)]
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
