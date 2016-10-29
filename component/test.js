const React = require('react')
const LoopinControl = require('./LoopinControl')

const ReactDOM = require('react-dom')

const data = {
  "type": "float",
  "min": 4,
  "max": 120,
  pow: 1.8,
  "default": 60,
  "markers": [
    4,
    8,
    12,
    24,
    30,
    48,
    60,
    75,
    120
  ],
  "key": "rate",
  "path": "clock/rate/"
}

ReactDOM.render(
  <div>
    <h1>Hello, foo!</h1>
  <LoopinControl { ...data } />
  </div>
, document.getElementById('app') )
