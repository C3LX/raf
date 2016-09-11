'use-strict'

var singleton = raf()

function raf () {
  var _observers = []
  var _raf = null
  var _now = Date.now()
  var _lastDate = _now

  function fpsLimiter (fps, fn) {
    var _lastDate = _now
    var _interval = 1000 / fps
    var _delta = -1
    return function () {
      _delta = (_delta === -1) ? _interval : _now - _lastDate
      if (_delta >= _interval) {
        fn(_delta)
        _lastDate = _now - (_delta % _interval)
      }
    }
  }

  function _run () {
    _now = Date.now()
    var _delta = _now - _lastDate

    for (var i = 0; i < _observers.length; i++) {
      _observers[i](_delta)
    }

    _lastDate = _now
    _raf = window.requestAnimationFrame(_run)
  }

  function start () {
    if (_raf) return
    _run()
  }

  function stop () {
    if (!_raf) return
    window.cancelAnimationFrame(_raf)
    _raf = null
  }

  function add (fn) {
    if (_observers.indexOf(fn) === -1) {
      _observers.push(fn)
      start()
    }
  }

  function remove (fn) {
    var index = _observers.indexOf(fn)
    if (index !== -1) {
      _observers.splice(index, 1)
      if (_observers.length === 0) stop()
    }
  }

  return {
    start: start,
    stop: stop,
    add: add,
    remove: remove,
    fpsLimiter: fpsLimiter
  }
}

module.exports = singleton
