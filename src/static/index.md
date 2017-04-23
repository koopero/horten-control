# Horten Control

`HortenControl` provides complete, easy-to use and adaptable controls for creative applications.

# Example

**example.yaml**
``` yaml
- path: 'timer/duration/'
  type: 'float'
  unit: 's'

- path: 'timer/start'
  type: 'trigger'
```

**example.js**

``` javascript
new H.Cursor( {
  path: 'timer/start',
  listening: true,
  onValue: ( value ) => {
    if ( value ) {
      let duration = parseFloat( H.root.get('timer/duration') ) * 1000
      console.log( 'Starting timer.')
      setTimeout( () => {
        console.log( `Time's up.`)
      }, duration )
    }  
  }
})
```


``` sh
npm install -g horten-server

horten-server \
  --index example.yaml \
  --require example.js \
  --persist data.json
```
