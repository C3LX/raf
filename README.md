<h1 align="center">raf</h1>
<h3 align="center">:movie_camera: A singleton RAF wrapper</h3>

<div align="center">
  <!-- License -->
  <a href="https://raw.githubusercontent.com/pqml/raf/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License" />
  </a>
  <!-- Standard -->
  <a href="http://standardjs.com/">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard" />
  </a>
</div>

===

## Features

- No dependencies
- Auto Stop/Play when adding/removing functions
- Fps Limiter
- Delta Time

## Installation

```sh
npm install pqml/raf -S
```

## Usage

```javascript
var raf = require('raf')

var run = function (dt) {
  console.log('default call at 60fps')
}

// create a function that can only run at 1fps
var oneSecInterval = raf.fpsLimiter(1, function (dt) {
  //display the delta time
  console.log('tick every second — delta time: ', dt)
})

// add run to the raf observers array. It will run at the default 60fps
raf.add(run)

// after 1000ms, remove run and add the oneSecInterval to the raf observers array
window.setTimeout(function () {
  raf.remove(run)
  raf.add(oneSecInterval)
}, 1000)

```

## Methods

### start(function)
Start the RAF wrapper

### stop(function)
Stop the RAF wrapper

### add(function)
Add _function_ to the RAF observers array <br/>
_function_ will be called with the delta time as first argument

### remove(function)
Remove _function_ from the RAF observers array

### fpsLimiter(framerate, function)
Create a closure to invoke _function_ at the specified _framerate_ <br/>
It's up to you to add/remove it from the RAF observers

## Credits
Based on an ES6 lib by [Antonin Langlade](https://github.com/antoninlanglade)

## License
MIT.
