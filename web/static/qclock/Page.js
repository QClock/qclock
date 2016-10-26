const availableFields = {
    color: function (data) {
            return `
            <div class="mdl-textfield mdl-js-textfield color-picker mdl-textfield--floating-label">
                <input class="mdl-textfield__input jscolor {onFineChange:'${data.name}FineChange(this)'}" type="text" id="${data.name}" name="${data.name}">
                <label class="mdl-textfield__label" for="${data.name}">${data.label}</label>
                <label class="mdl-textfield__label" for="${data.name}">${data.label}</label>
            </div>`
        }
}


class Page {
    constructor () {
        this.page = ''
        this.notifyTimeout = 0
		this.fields = []
    }

    getContainer () {
        return $('[data-page=' + this.page+ ']')
    }

    get availableFields () {
    	return availableFields;
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
            success: () => {cb()},
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
            } else {
                data[key] = elem.val()
            }
        })

        return data;
    }

    setElementValue (element, value) {
        if (element[0].className.indexOf('jscolor') > -1) {
            element[0].jscolor.fromString(value)
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
		if (data.clockface) {

			for (let field of Object.keys(data.clockface)) {
				let fieldObj = data.clockface[field]

				fieldObj.name = field

				if (availableFields[fieldObj.type]) {
					let elem  = $('.clockface-settings').append(availableFields[fieldObj.type](fieldObj))

					if (fieldObj.type == 'color') {
						$(`#${field}`)[0].jscolor = new jscolor($(`#${field}`)[0])
					}
				}
			}
		}

		for (let input of Object.keys(data)) {
			if (this.container.find(`#${input}`).length) {
				this.fields.push(`#${input}`)
				this.setElementValue(this.container.find(`#${input}`), data[input])
			}
		}



	}
}