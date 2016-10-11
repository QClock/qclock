
class Page {
    constructor () {
        this.page = ''
        this.notifyTimeout = 0
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

            if (elem.attr('type') === 'checkbox') {
                data[field] = elem.prop('checked')
            } else {
                data[field] = elem.val()
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
        this.showPage();
    }

    notify (message) {

        clearTimeout(this.notifyTimeout)

        this.notifyTimeout = setTimeout(() => {
            let data = { message };
            $('#Notification')[0].MaterialSnackbar.showSnackbar(data);
        }, 300);

    }
}