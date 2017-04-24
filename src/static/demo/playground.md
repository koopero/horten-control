# Playground

This page is dedicated to experimental components and combinations.

# painter

``` control
clear: both
path: /painter/paint
type: grid
cellPath: '{ ind }'
cell:
  type: momentary
  size: big
cols: 4
rows: 2
```

``` control
clear: both
path: /painter/colour
type: colour
```


# Conway

``` control
path: /conway/universe/
type: grid
rows: 9
cols: 9
```



## Loader

``` control
src: 'camera.yaml'
```


## Float

``` control
path: camera/yaw/
type: float
min: -180
max: 180
markers: [ -180, -90, -45, -15, 0, 15, 45, 90, 180 ]
unit: °
```

## Options

``` control
path: helloOrWorld
title: Choose Either Hello or World
options:
  - Hello
  - World
```
Again, to make sure they sync.
``` control
path: helloOrWorld
title: Choose Either Hello or World
options:
  - Hello
  - ','
  - Isn't
  - It
  - A
  - Wonderful
  - World
  - '?'
```
