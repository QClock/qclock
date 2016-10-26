


class ClockFacePage extends Page {


    constructor () {
        super()

        window.outerFineChange = (colorjs) => {this.onChange()}
        window.innerFineChange = (colorjs) => {this.onChange()}

        this.page = 'clockface'
        this.container = this.getContainer()

        this.container.find('#TogglePreview').on('click', (e) => this.onPreview(e))
    }

    load () {
        this.getPageData((data) => this.onPageData(data))
    }

    onPageData (data) {
        super.onPageData(data)

		this.fields.forEach((field) => {
			this.container.find(field).on('change', (e) => this.onChange(e))
		})

		this.show()
    }

    onPreview () {
        console.log('TogglePreview')
    }

    onChange () {
        let data = this.getFieldValues()



        this.sendPageData(data, () => {
            this.notify('Clockface set')
        })

        //console.log(data)


    }

}
