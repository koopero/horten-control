var React = require('react')
var LoopinControl = require('./LoopinControl')

var ReactDOM = require('react-dom')

var data = {
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


var markdown = `
## Combo

\`\`\` control
path: camera
subs:
#  zoom:
#    type: float
#    min: 28
#    max: 800
#    markers: [ 28, 50, 80, 135, 250, 400, 800 ]
#    pow: 2
#    unit: mm
  yaw:
    type: float
    min: -180
    max: 180
    sign: true
    markers: [ -180, -90, -45, -15, 0, 15, 45, 90, 180 ]
    unit: °

#  red:
#    type: float
#    digits: 0
#    markers: [0, 0.5, 1]
#    unit: '%'
#    subs:
#      pink:
#        type: float
#        digits: 0
#        markers: [0, 0.5, 1]
#        unit: '%'
\`\`\`

## Float

\`\`\` control
path: camera/yaw/
type: float
min: -180
max: 180
markers: [ -180, -90, -45, -15, 0, 15, 45, 90, 180 ]
unit: °
\`\`\`

## Options

\`\`\` control
title: Choose Either Hello or World
options:
  - Hello
  - World
\`\`\`

## Trigger

\`\`\` control
trigger:
  foo: Hello
  bar: World
\`\`\`

## Source

\`\`\` c
int main() {
  return 0;
}
\`\`\`



`

ReactDOM.render(
  <div>
    <LoopinControl markdown={ markdown } />
  </div>
, document.getElementById('app') )
