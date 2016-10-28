
const availableFields = {
	color: function (data) {
		return `
            <div class="mdl-textfield mdl-js-textfield color-picker mdl-textfield--floating-label is-dirty">
                <input class="mdl-textfield__input jscolor {onFineChange:'${data.name}FineChange(this)'}" type="text" id="${data.name}" name="${data.name}">
                <label class="mdl-textfield__label" for="${data.name}">${data.label}</label>
            </div>`
	},
	slider: function (data) {
		return `
			<div><label>${data.label}</label></div>
			<div class="mdl-textfield">
				<input class="mdl-slider mdl-js-slider" id="${data.name}" type="range"
					min="0" max="100" value="25" tabindex="0">
			</div>`
	}
}


class ClockFacePage extends Page {


    constructor () {
        super()

        // todo
        window.outerFineChange = (colorjs) => {this.onChange()}
        window.innerFineChange = (colorjs) => {this.onChange()}

        this.page = 'clockface'
        this.container = this.getContainer()

        this.container.find('#TogglePreview').on('click', (e) => this.onPreview(e))
        this.container.find('#ClockfaceType').on('click', (e) => e.preventDefault())

        this.container.find('ul[for=ClockfaceType]').on('click', 'li', (e) => {
        	console.log(e.target)
			this.sendPageData({
				clockface: $(e.target).data('clockface')
			}, (data) => {
				console.log(data)
				
				this.onPageData(data)
				this.notify('Clockface set')
			})
        })
    }

    load () {
        this.getPageData((data) => this.onPageData(data))
    }

    onPageData (data) {

		if (data.clockface) {

			this.container.find('.current-theme').text(data.clockface.current)
			this.container.find('ul[for=ClockfaceType] li').remove()
			this.container.find('ul[for=ClockfaceType]').parents('.mdl-menu__container').removeClass('is-visible')

			for (let item of data.clockface.list) {
				this.container.find('ul[for=ClockfaceType]')
					.append(`<li ${ data.clockface.current == item ? 'disabled' : ''} class="mdl-menu__item" data-clockface="${item}">${item}</li>`)
			}

			$('.clockface-settings').children().remove()

			for (let field of Object.keys(data.clockface.fields)) {
				let fieldObj = data.clockface.fields[field]

				fieldObj.name = field

				if (availableFields[fieldObj.type]) {
					let elem  = $('.clockface-settings').append(availableFields[fieldObj.type](fieldObj))

					if (fieldObj.type == 'color') {
						$(`#${field}`)[0].jscolor = new jscolor($(`#${field}`)[0])
					}
				}
			}
		}




        super.onPageData(data)
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
