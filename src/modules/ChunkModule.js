
export function chunkTree(text, chunkSize) {
    if (text.length < chunkSize * 2) {
        return { text }
    }

    const nofChunks = Math.floor(text.length / chunkSize);
    const mid = (Math.floor(nofChunks / 2) + (nofChunks % 2)) * chunkSize;

    return {
        text,
        left: [chunkTree(text.slice(0, mid), chunkSize)],
        right: [chunkTree(text.slice(mid), chunkSize)]
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
