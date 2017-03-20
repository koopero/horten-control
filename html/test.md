# Pixels

``` control
path: /pixels_out
type: pixels
channels: rgba
pixels: ff00ff 00ffff
format: hex
cols: 2
rows: 1
```





# Source

``` c
int main() {
  return 0;
}
```

``` yaml
clear: 'both'
path: '/painter/paint'
type: 'grid'
cellPath: '{ ind }'
cell:
  type: 'momentary'
  size: 'big'
cols: 4
rows: 2
```

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
