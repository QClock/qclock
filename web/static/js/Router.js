

class Router {
    constructor (pages) {
        this.pages = pages;

        if (this.pages[this.getPath()]) {
            this.pages[this.getPath()].load()
        }
    }

    getPath () {
        return location.pathname.replace('/', '')
    }
}
