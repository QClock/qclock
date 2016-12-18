


class AnimationsPage extends Page {


    constructor () {
        super()

        this.fields = [

        ]

        this.page = 'animations'
        this.container = this.getContainer()

        this.createWs()

        var p = 113;

        for (;p >= 0 ; p--) {

            var elem = $('<div class="pixel ' + (p < 58 ? 'outer' : 'inner') + ' p--' + p + '"><span></span></div>');

            elem.css({
                'transform': 'rotate(' + this.getRotation(p) + 'deg)'
            })
            $('.pixels').append(elem)

        }



        this.container.find('.animation-collection').on('click', 'button', (e)=>this.onChange(e))

    }

    createWs () {
        this.ws = new WebSocket('ws://' + location.hostname + ":8899")
        this.ws.addEventListener('message', (e) => this.onWsMessage(e))
    }

    onWsMessage (e) {
        //console.log(e)

        let that = this

        var fileReader = new FileReader();
        fileReader.onload = function() {
            that.displayClock(new Uint8Array(this.result));
        };
        fileReader.readAsArrayBuffer(e.data);
    }

    renderButton(data) {

        let color = data.color || 'purple'
        let initials = data.name.split(' ').reduce((prev, word)=>{return prev + word.toUpperCase()[0]}, '')

//<span class="mdl-color--${color} mdl-chip__contact">${initials}</span>

        return `
            <button class="mdl-chip animation-chip" data-animation="${data.label}">
                <span class="mdl-chip__text">${data.name}</span>
                <a href="#" class="mdl-chip__action"><i class="material-icons">play_circle_filled</i></a>
            </button>`

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

    displayClock (intArray) {
        var pixels = [];



        intArray.forEach(function (val, i) {
            if (i > 0 && i % 3 == 0) {
                pixels.push([intArray[i-3],intArray[i-2], intArray[i-1]])
            }
        });

        //console.log(pixels.length)

        pixels.forEach(function (p, i) {

            console.log(p)
            var elem = $('.pixel.p--' + i +' span')

            var style = {
                'background-color': 'rgb(' + [p[0], p[1], p[2]].join(',') + ')',
                'box-shadow': '0 -5px 32px 5px rgba(' + [p[0], p[1], p[2]].join(',') + ',1)'
            }


            if (p[1] == 0 && p[0] == 0 && p[2] == 0) {
                style = {
                    'background-color': 'white',
                    'box-shadow': '0 0 14px 3px white'
                }
            }

            elem.css(style);

        })

    }

    getRotation (p) {

        var deg = 180;

        if (p < 58) {
            deg = deg + (p * 6.2);
        }

        if (p >= 58) {
            deg = deg - ( (p - 58 + 1) * 6.4)  
        }

        return deg
    }

}
