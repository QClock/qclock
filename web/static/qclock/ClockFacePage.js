


class ClockFacePage extends Page {


    constructor () {
        super()

        window.outerFineChange = (colorjs) => {this.onChange()}
        window.innerFineChange = (colorjs) => {this.onChange()}

        this.fields = [
            '#OuterColor',
            '#InnerColor',
            '#DimToggle',
            '#DimLevel',
            '#DimStartHour',
            '#DimEndHour'
        ]

        this.page = 'clockface'
        this.container = this.getContainer()

        this.fields.forEach((field) => {
            this.container.find(field).on('change', (e) => this.onChange(e))
        })

        this.container.find('#TogglePreview').on('click', (e) => this.onPreview(e))
    }

    load () {

        this.getPageData((data) => this.onPageData(data))

    }

    onPageData (data) {

        this.setElementValue(this.container.find('#OuterColor'), data.outerColor.toUpperCase())
        this.setElementValue(this.container.find('#InnerColor'), data.innerColor.toUpperCase())
        this.setElementValue(this.container.find('#DimLevel'), data.dimLevel)

        this.setElementValue(this.container.find('#DimStartHour'), data.dimFrom)
        this.setElementValue(this.container.find('#DimEndHour'), data.dimTo)

        super.load()
    }

    onPreview () {
        console.log('TogglePreview')
    }

    onChange () {
        let data = this.getFieldValues()

        this.sendPageData({
            outerColor: data['#OuterColor'],
            innerColor: data['#InnerColor'],
            dimEnabled: data['#DimToggle'],
            dimLevel: +data['#DimLevel'],
            dimFrom: +data['#DimStartHour'],
            dimTo: +data['#DimEndHour']
        }, () => {
            this.notify('Clockface set')
        })

        //console.log(data)


    }

}
