var raf = require('../index.js')

var oneSecInterval = raf.fpsLimiter(1, function (dt) {
  console.log('tick every second — delta time: ', dt)
})

var run = function (dt) {
  console.log('default call at 60fps')
}

raf.add(run)
window.setTimeout(function () {
  raf.remove(run)
  raf.add(oneSecInterval)
}, 1000)
