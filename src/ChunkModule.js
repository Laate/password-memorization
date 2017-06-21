
export default class ChunkModule {
    constructor() {
        // Example flow for the password "123456abcdef"
        // TODO make generalized and remove hardcoding
        this.chunks = ["123", "456", "123456", "abc", "def", "abcdef", "123456", "abcdef", "123456abcdef"] ;
        this.index = 0
    }

    next() {
        return this.chunks[this.index++];
    }

    hasNext() {
        return this.index < this.chunks.length
    }

    reset() {
        this.index = 0
    }

}