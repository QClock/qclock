


class AdvancedPage extends Page {


    constructor () {
        super()

        this.fields = [

        ]

        this.page = 'advanced'
        this.container = this.getContainer()

    }

    load () {
        this.getPageData((data) => this.onPageData(data))
    }

    onPageData (data) {
        console.log(data)

        this.container.find('.debug-log').val(data.debug)

        super.load()
    }


}
