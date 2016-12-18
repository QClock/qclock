const WebSocket = require('ws')
const hsl2rgb = require('../src/lib/util/hsl-to-rgb')


function getStubPixels () {
        // todo config stub-pixel-count
        return (new Array(6 * 3)).fill(0);
    }

var ws = new WebSocket('ws://192.168.1.101:8899');
//var ws = new WebSocket('ws://127.0.0.1:8899');

ws.on('open', function open() {
    let frame_count = 360
    let frames = (new Array(frame_count)).fill([])
    let fps = 30

    frames = frames.map((frameArray, frameIndex) => {

        let outer = (new Array(58)).fill([0,0,0])
        let inner = (new Array(56)).fill([0,0,0])

        outer = outer.map((b, i)=>{
            // 0-360, 0-1, 0-1
            let hue = Math.round((i / 58) * 360)

            let step = hue + frameIndex

            if (step > 360){
                step = step - 360
            }

            return hsl2rgb(step, 1, 0.5)
        })



        inner = inner.map((b, i)=>{

            //let hue = Math.round((i / 56) * 360)
            //let step = 360 - (hue + frame)
            //if (step < 0){
                //step = step + 360
            //}

            //return new Buffer(hsl2rgb(step, 1, 0.5))
            return b
        })


        outer = outer.reduce((collector, item) => collector.concat(item), [])
        inner = inner.reduce((collector, item) => collector.concat(item), [])

        return outer.concat(getStubPixels(), inner)

    })

console.log(frames)

    ws.send(JSON.stringify({
        frames,
        fps
    }))


//        let buf = Buffer.concat([
//            Buffer.concat(out),
//            getStubPixels(),
//            Buffer.concat(inn)
//        ])

//



//        if (frame == max_frames) {
  //          clearInterval(interval)
    //        ws.close();
      //      return;
        //}


});