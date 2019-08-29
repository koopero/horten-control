# Horten Control

Is a paragraph.

``` control
path: airplane/
type: yaml
default:
  roll: 0
  pitch: 0
  yaw: 0
  altitude: 10000
```

**Lorem Ipsum** is *simply dummy text* of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

---

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
  destination:
    type: options
    source: airports/

  ////:
    options:
      land:
        pitch: -5
        engines: idle
      takeoff:
        pitch: 10
        engines: toga

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
sliders: rgb hsv
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
type: yaml
path: airports/
default:
  CYVR: 
    lat: 49.194
    lng: -123.183
  
  CYYZ:
    lat: 43.677
    lng: -79.63
```

``` control
type: tabs
path: airports/
source: airports/
sub:
  subs:
    wind:
      type: slider
      cols: 12
      default: 0
      unit: kn
      max: 120
      pow: 2
      quant: 1
      digits: 0
```


``` control
path: airports/CZZZ
trigger:
  lat: 49.194
  lng: -123.183
```