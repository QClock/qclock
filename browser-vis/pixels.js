window.__timeTravel = false

function display (intArray) {
    const pixels = [];

    intArray.forEach(function (val, i) {
        if (i > 0 && i % 3 == 0) {
            pixels.push([intArray[i-3],intArray[i-2], intArray[i-1]])
        }
    });

    pixels.forEach(function (p, i) {
        const elem = $('.pixel.p--' + i +' span')
        let style = {
            'background-color': 'rgb(' + [p[1], p[0], p[2]].join(',') + ')',
            'box-shadow': '0 -5px 32px 5px rgba(' + [p[1], p[0], p[2]].join(',') + ',1)'
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



function getRotation (p) {
    let deg = 180;

    if (p < 58) {
        deg = deg + (p * 6.2);
    }

    if (p >= 58) {
        deg = deg - ( (p - 58 + 1) * 6.4)
    }

    return deg
}

let p = 113;

for (;p >= 0 ; p--) {

    const elem = $('<div class="pixel ' + (p < 58 ? 'outer' : 'inner') + ' p--' + p + '"><span></span></div>');

    elem.css({
        'transform': 'rotate(' + getRotation(p) + 'deg)'
    })
    $('.pixels').append(elem)
}

var ws = new WebSocket('ws://127.0.0.1:8088/');

ws.addEventListener('message', function (e) {
//    console.log('socket msg');

    const fileReader = new FileReader();
    fileReader.onload = function() {
        display(new Uint8Array(this.result));
    };
    fileReader.readAsArrayBuffer(e.data);
})

const startTime = new Date()

setInterval(() => {
    if (!window.__timeTravel) return;

    startTime.setTime( startTime.getTime() + (60 * 1000) )

    ws.send(JSON.stringify({ time: startTime.getTime() }))

}, 46)

