
``` control
path: airplane/
type: yaml
default:
  roll: 0
  pitch: 0
  yaw: 0
  altitude: 10000
```


``` control
path: airplane/flaps
type: slider
pow: 2
```


``` control
path: airplane/
subs:
  engines:
    options:
      - idle
      - cruise
      - toga
  pitch: { type: pitch }
  //:
    description: Landin' time
    trigger:
      pitch: -5
      engines: idle
  ///:
      description: Level Out
      trigger:
        pitch: 0
        engines: cruise
```

### Pixels

``` control
path: airplane/lights
type: pixels
sliders: hsv
channels: rgb
width: 3
colour: '880000'
default:
  data: '000000 108030'
```

### Collector

``` control
type: collector
source: airplane/
path: preset/collected/
```

### Tabs

``` control
type: tabs
source: airplane/
path: preset/collected/
```
