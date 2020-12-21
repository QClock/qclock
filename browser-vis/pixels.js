

function display (int32Array) {
    const pixels = int32Array.reduce((arr, value) => {
        const r = value >> 16
        const g = (value - (r << 16)) >> 8
        const b = value - (r << 16) - (g << 8)

        if (value > 0) {

            console.log([r,g,b])
        }
        arr.push([r,g,b])

        return arr
    }, []);

    pixels.forEach(function (p, i) {
        var elem = $('.pixel.p--' + i +' span')
        var style = {
            'background-color': 'rgb(' + [p[0], p[1] , p[2]].join(',') + ')',
            'box-shadow': '0 -5px 32px 5px rgba(' + [p[0], p[1], p[2]].join(',') + ',1)',
        }

        if (p[1] == 0 && p[0] == 0 && p[2] == 0) {
            style = {
                'background-color': 'white',
                'box-shadow': '0 0 14px 3px white',
            }
        }

        elem.css(style);
    })

}

function getRotation (p) {
    var deg = 180;

    if (p < 58) {
        deg = deg + (p * 6.2);
    }

    if (p >= 58) {
        deg = deg + ( (p - 58 + 1) * 6.4)
    }

    return deg
}

var p = 113;

for (;p >= 0 ; p--) {

    var elem = $('<div class="pixel ' + (p < 58 ? 'outer' : 'inner') + ' p--' + p + '"><span></span><em>' + p + '</em></div>');

    elem.css({
        'transform': 'rotate(' + getRotation(p) + 'deg)'
    })
    $('.pixels').append(elem)
}

var ws = new WebSocket('ws://192.168.0.4:8080/');

ws.addEventListener('message', function (e) {
    var fileReader = new FileReader();
    fileReader.onload = function() {
        display(new Uint32Array(this.result));
    };
    fileReader.readAsArrayBuffer(e.data);
})

