


class DateTimePage extends Page {


    constructor () {
        super()

        this.fields = [
            '#Hours',
            '#Minutes',
            '#TimeZoneOffset'
        ]

        this.page = 'datetime'
        this.container = this.getContainer()

        this.fields.forEach((field) => {
            this.container.find(field).on('change', (e) => this.onChange(e))
        })
    }

    load () {

        this.getPageData((data) => this.onPageData(data))

    }

    onPageData (data) {

        let date = new Date(data.datetime)

        this.setElementValue(this.container.find('#Hours'), date.getHours())
        this.setElementValue(this.container.find('#Minutes'), date.getMinutes())

        this.setElementValue(this.container.find('#TimeZoneOffset'), data.timezone * 60)

        super.load()
    }

    onChange () {
        let data = this.getFieldValues()

        console.log(data)

        let date = new Date()
        date.setHours(data['Hours'])
        date.setMinutes(data['Minutes'])

        console.log(date)

        this.sendPageData({
            datetime: +date,
            timezone: Math.round(+data['TimeZoneOffset'] / 60)
        }, () => {
            this.notify('Time set')
        })
    }

}
