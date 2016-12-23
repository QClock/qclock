


class AnimationsPage extends Page {


    constructor () {
        super()

        this.fields = [

        ]

        this.page = 'animations'
        this.container = this.getContainer()

        this.container.find('.animation-collection').on('click', 'button', (e)=>this.onChange(e))

    }

    renderButton(data) {

        let color = data.color || 'purple'
        let initials = data.name.split(' ').reduce((prev, word)=>{return prev + word.toUpperCase()[0]}, '')

//<span class="mdl-color--${color} mdl-chip__contact">${initials}</span>

        return `
            <button class="mdl-chip animation-chip" data-animation="${data.label}">
                <span class="mdl-chip__text">${data.name}</span>
                <a href="#" class="mdl-chip__action"><i class="material-icons">play_circle_filled</i></a>
            </button><br />`

    }

    load () {
        this.getPageData((data) => this.onPageData(data))
    }

    onPageData (data) {
        console.log(data)

        let html = data.animations.reduce((collection, anim)=> {return collection += this.renderButton(anim)}, '')

        this.container.find('.animation-collection').html(html)

        super.load()
    }

    onChange (e) {
    //    let data = this.getFieldValues()

        e.preventDefault()
        e.stopPropagation()

        this.sendPageData({
            run: $(e.currentTarget).data('animation')
        }, () => {
            this.notify('Animation ran')
        })

    }

}
