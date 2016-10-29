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


const markdown = `
## Float

\`\`\` control
path: camera/angle/
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
