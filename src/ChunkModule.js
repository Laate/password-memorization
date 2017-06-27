export function getChunks(string, chunkSize=3) {
    const chunks = chunkString(string, chunkSize);
    const mid = (chunks.length / 2) + (chunks.length % 2);

    return chunkTree(chunks.slice(0, mid), chunks.slice(mid)).reverse();
}

// Maybe there's a nice regex for this? /.{1,3}/g almost works, but leaves a remainder if not divisible by chunkSize
function chunkString(string, chunkSize) {
    const chunks = [];
    for (let i = 0; i < string.length; i += chunkSize) {
        if (string.length - i < chunkSize*2) {
            chunks.push(string.slice(i));
            break
        }
        chunks.push(string.slice(i, i + chunkSize ));
    }
    return chunks
}

function chunkTree(leftChunks, rightChunks) {
    if (leftChunks.length <= 1 && rightChunks.length <= 1) {
        return split({left: leftChunks.join(""), right: rightChunks.join("")})
    }

    // Round division upwards on left side to better balance the sides
    const leftMid = leftChunks.length / 2 + (leftChunks.length % 2);
    const rightMid = rightChunks.length / 2;

    return [{left: leftChunks.join(""), right: rightChunks.join("")}].concat(
        chunkTree(rightChunks.slice(0, rightMid), rightChunks.slice(rightMid)),
        chunkTree(leftChunks.slice(0, leftMid), leftChunks.slice(leftMid)))
}

function split(chunk) {
    if (chunk.left && chunk.right) {
        return [chunk, {left: "", right: chunk.right},{left: chunk.left, right: ""}]
    }
    return [chunk]
}

