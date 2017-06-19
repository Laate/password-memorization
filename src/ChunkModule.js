
export default class ChunkModule {
    constructor() {
        this.texts = ["a", "b", "c", "d", "e", "f", "g"];
        this.index = 0
    }

    next() {
        return this.texts[this.index++];
    }

    hasNext() {
        return this.index < this.texts.length
    }

    reset() {
        this.index = 0
    }

}