# Demo

Hello.


# Sliders


``` control
path: airplane/throttle
type: slider
pow: 2
colour: green
direction: left
show: source
```

# Misc

## Vector

``` control
type: vector
path: airplane/vector
channels: rgbxyz
sliders: vhsxyz
```

``` control
type: vector
path: airplane/vector
channels: rgbxyz
sliders: vhsxyz
```

``` control
path: airplane/vector/x
type: slider
pow: 2
colour: green
direction: left
```


## Image

``` control
type: image
path: loopin/buffer/indian
title: Indian Test Pattern
src: /image/indian.png
```