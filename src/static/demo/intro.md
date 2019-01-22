## Pixels
``` control
path: /pixels
description: Pixel element
type: pixels
sliders: rgbhsva
channels: rgb
format: hex
cols: 4
rows: 2
clear: both
```

The `pixels` control outputs a string of colour codes in roughly CSS format. We
can both read and write these values using the `text` control below:

``` control
path: /pixels/data
type: text
size: 60
sub:
  channels: hsv
default: '#0000dd #dd00dd'
```

``` control
path: /pixels
type: yaml
```



``` control
type: map
path: camera
sub: 
  type: yaml
```

``` control
path: camera
meta:
  type:
    angle:
      default: 0
      type: slider
      min: -180
      max: 180
      markers: [ -180, -90, -45, -15, 0, 15, 45, 90, 180 ]
      unit: °

subs:
  yaw:
    type: angle
  pitch:
    type: angle
  roll:
    type: angle
    min: -90
    max: 90
```

# Controls

## Text
``` control
path: text/
type: text
default: Welcome to the demo!
```


## Slider

``` control
path: camera/yaw/
default: 0
type: slider
min: -180
max: 180
markers: [ -180, -90, -45, -15, 0, 15, 45, 90, 180 ]
unit: °
```
``` control
path: camera/zoom
type: slider
default: 135
min: 28
max: 800
markers: [ 28, 50, 80, 135, 250, 400, 800 ]
pow: 2
precision: 0
unit: mm
```
``` yaml
path: camera/zoom
type: slider
default: 135
min: 28
max: 800
markers: [ 28, 50, 80, 135, 250, 400, 800 ]
pow: 2
precision: 0
unit: mm
```

## Trigger

``` control
path: camera
description: Centre the camera.
trigger:
  yaw: 0
  zoom: 50
  flash: true
```
Now, the source code...
``` yaml
path: camera
description: Centre the camera.
trigger:
  yaw: 0
  zoom: 50
```

## Options

``` control
path: camera/zoom
options:
  - 28
  - 35
  - 50
  - 135
  - 250
```
#### Source
``` yaml
path: camera/zoom
options:
  - 28
  - 35
  - 50
  - 135
  - 250
```



## Colour
