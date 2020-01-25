# Imaginary Airspace

hello autopilot.

## Autopilot

``` control
path: airp
type: airAlt
```

Before we go any further, be sure that you are viewing this document in the `horten-control` client. Since horten controls are written in *markdown*, they are readable in any old markdown viewer, but controls will not be rendered. If you see a circular dial above, you're good to go. Otherwise, please view this demo at [Demo link] for full interactive experience.

## *An Imaginary Airplane...*

For the purposes of demonstration.

``` control
path: airplane/
type: yaml
default:
  roll: 0
  pitch: 0
  yaw: 0
  altitude: 10000
```

---

### Flight Controls

``` control
path: airplane/flaps
type: slider
pow: 2
```

--- 

### Advanced Flight Controls

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

--- 

### Lights

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

---

### Airports

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


## Colours

``` control
colour: white
subs:
  a: 
    type: number

  //:
    display:
      colour: white
```