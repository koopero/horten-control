``` control
type: yaml
path: data
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
    description: Steer the ship, ye swabbies!
  pitch:
    type: angle
  roll:
    type: angle
```

``` control
path: data
trigger:
  foo: 4
  bar: 3
```

``` control
path: data/foo
type: slider
```
