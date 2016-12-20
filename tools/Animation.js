
module.exports = class Animation {

    constructor (frame_count, fps, outerIterator, innerIterator, stubPixels = 6) {
        this.stubPixels = stubPixels
        this.frame_count = frame_count
        this.fps = fps
        this.outerIterator = outerIterator
        this.innerIterator = innerIterator

        this.frames = (new Array(frame_count)).fill([])
        this.frames = this.frames.map((frameArray, frameIndex) => this.renderFrame(frameArray, frameIndex))
    }

    getStubPixels () {
        return (new Array(this.stubPixels * 3)).fill(0);
    }

    renderFrame (frameArray, frameIndex) {
        let outer = (new Array(58)).fill([0,0,0])
        let inner = (new Array(56)).fill([0,0,0])

        outer = outer.map((pixel, pixelIndex, pixels) => this.outerIterator(frameIndex, pixel, pixelIndex, pixels))
        inner = inner.map((pixel, pixelIndex, pixels) => this.innerIterator(frameIndex, pixel, pixelIndex, pixels))

        outer = outer.reduce((collector, item) => collector.concat(item), [])
        inner = inner.reduce((collector, item) => collector.concat(item), [])

        return outer.concat(this.getStubPixels(), inner)
    }

    render () {
        return JSON.stringify({
            frames: this.frames,
            fps: this.fps
        })
    }
}

