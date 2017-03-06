

class Page {
    constructor () {
        this.page = ''
        this.notifyTimeout = 0
		this.fields = []
    }

    getContainer () {
        return $('[data-page=' + this.page+ ']')
    }

    getPageData (cb) {
        $.getJSON('/api/' + this.page, cb)
    }
    sendPageData (data, cb) {

        console.log(data)

        $.ajax( '/api/' + this.page, {
            method: 'PUT',
            data: data,
            dataType: 'json',
            success: (...args) => {cb(...args)},
            error: (err) => {console.error(err)}
        })

    }
    showPage() {
        this.getContainer().removeClass('hidden')
    }

    getFieldValues () {
        let data = {}

        this.fields.forEach((field) => {
            let elem = this.container.find(field)
			let key = field.replace('#','')

            if (elem.attr('type') === 'checkbox') {
                data[key] = elem.prop('checked')
            } else if (elem.hasClass('color__input')) {
                data[key] = $.farbtastic(`#${elem.attr('id')}_wheel`).hsl.map((val, i) => {

                    if (i) {
                        return Math.floor(val * 100)
                    } else {
                        return Math.floor(val * 360)
                    }
                })
            } else {
                data[key] = elem.val()
            }
        })

        return data;
    }

    setElementValue (element, value) {
        if (element.hasClass('color__input')) {
            console.log(value)
            $.farbtastic(`#${element.attr('id')}_wheel`).setHSL([value[0] / 360, value[1]/100 ,value[2]/100])

        } else {
            element.val(value)
        }

        element.parent().addClass('is-dirty')
    }

    load () {
    	this.show()
	}

    show () {
        this.showPage();
    }

    notify (message) {

        clearTimeout(this.notifyTimeout)

        this.notifyTimeout = setTimeout(() => {
            let data = { message };
            $('#Notification')[0].MaterialSnackbar.showSnackbar(data);
        }, 300);

    }

    onPageData (data) {
        this.fields = []
		for (let input of Object.keys(data)) {
			if (this.container.find(`#${input}`).length) {
				this.fields.push(`#${input}`)
				this.setElementValue(this.container.find(`#${input}`), data[input])
			}
		}

        this.fields.forEach((field) => {
            this.container.find(field).on('change', (e) => this.onChange(e))
        })


	}
}