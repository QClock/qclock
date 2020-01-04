window.__timeTravel = false

function display (intArray) {
//    console.log(intArray.length / 3);

    const pixels = [];

    intArray.forEach(function (val, i) {
        if (i > 0 && i % 3 == 0) {
            pixels.push([intArray[i-3],intArray[i-2], intArray[i-1]])
        }

        if (i == intArray.length - 1) {
            pixels.push([intArray[i-2],intArray[i-1], intArray[i]])
        }
    });

// does not count 6 stub pixels !!!!!

    pixels.forEach(function (p, i) {
        //console.log('pixel', i);

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
    let deg = 183;

    if (p < 58) {
        deg = deg + (p * 6.2);
    }

    if (p >= 64) {
        deg = deg - ( (p - 64 + 1 ) * 6.45)
    }

    return deg
}

let p = 119;

for (;p >= 0 ; p--) {

    if (p >= 58 && p < 64) continue;

    const rim = p < 58 ? 'outer' : 'inner'

    const elem = $('<div class="pixel ' + rim + ' p--' + p + '"><span></span><em>' +  p + '</em></div>');

    elem.css({
        'transform': 'rotate(' + getRotation(p) + 'deg)'
    })
    $('.pixels').append(elem)
}

fetch('http://0.0.0.0:9090/api/datetime')
    .then((r) => r.json())
    .then((r) => {
        const d = new Date(r.time)

        document.querySelector('.hours').value = d.getHours()
        document.querySelector('.minutes').value = d.getMinutes()
    })
    .catch(e => console.error(e))

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

}, 120)


const setTime = () => {
    const hours = document.querySelector('.hours').value
    const minutes = document.querySelector('.minutes').value

    const d = new Date(
        (new Date((new Date()).setHours(hours))).setMinutes(minutes)
    )

    try {
        ws.send(JSON.stringify({ time: d.getTime() }))
    } catch (e) {
        console.log(e);
    }
}

document.querySelector('.hours').addEventListener('change', setTime)
document.querySelector('.minutes').addEventListener('change', setTime)

