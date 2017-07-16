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
``` yaml
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

## Pixels
``` control
path: /pixels
title: Background
type: pixels
channels: rgba
format: hex
cols: 2
rows: 1
clear: both
hide: all
```

The `pixels` control outputs a string of colour codes in roughly CSS format. We
can both read and write these values using the `text` control below:

``` control
path: /pixels
type: text
sub:
  channels: hsv
default: '#0000dd #dd00dd'
```


## Colour
