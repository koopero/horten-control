import React from 'react'
import { Space } from 'deepcolour'
import Ranger from '../util/Ranger'
import YAML from './YAML'
import _ from 'lodash'
import BoxSlider from './BoxSlider'
import VBoxSlider from './VBoxSlider'

const SLIDER_PRESETS = {
  xy: {
    min: -1
  },
  uv: {

  },
  hs: {

  },
  z: {
    direction: 'left'
  }
}

function parseOptions( props ) {

  let channels = ''
  let sliders = []
  let options = { sliders }
  parseChannels( props.channels  )
  parseSliders( props.sliders || props.channels )

  options.space = Space( {
    channels
  })
  options.channels = channels
  options.value = new options.space()

  return options

  function addChannel( key ) {
    if ( channels.indexOf( key ) != -1 )
      return
    
    channels += key
  }

  function parseChannels( opt ) {
    if ( _.isString( opt ) )
      opt = opt.split('')

    _.map( opt, ( chan ) => addChannel( chan ) )
  }

  function parseSliders( opt ) {
    if ( _.isString( opt ) ) {
      let str = opt 
      while( str.length ) {
        let preset 
        let key
        for( let prefix in SLIDER_PRESETS ) {
          if ( str.startsWith( prefix ) ) {
            key = prefix
            preset = SLIDER_PRESETS[ key ]
            preset.key = key
            break
          }
        }

        key = key || str[0]
        str = str.substr( key.length )

        if ( /[^\w]/.exec( key ) )
          continue
        
        addSlider( preset || key )
      }
    }
  }

  function addSlider( preset ) {
    if ( _.isString( preset ) )
      preset = { key: preset }

    
    let { channels, key } = preset || {}

    channels = channels || key || ''
    if ( _.isString( channels ) )
      channels = channels.split('')

    if ( !_.isArray( channels ) )
      channels = []

    channels = channels.map( v => _.isString( v ) && v.replace(/[^\w]/g,'') )
    channels = channels.filter( v => v && v.length == 1 )

    if ( !channels || !channels.length )
      return 

    channels = channels.join('')
    preset.channels = channels
    let length = preset.length = channels.length

    let ranges = []
    for ( let index = 0; index < length; index ++ ) {
      let channel = channels[index]
      addChannel( channel )
      let range = preset.ranges && (preset.ranges[index] || preset.ranges[channels[index]])
      let config = _.merge( {}, props, preset, range )
      range = new Ranger( config )
      ranges[index] = range
    }

    preset.ranges = ranges
    preset.label = key 

    sliders.push( preset )
  }
}

export default class Vector extends React.Component {
  constructor( props ) {
    super( props )
    this.state = {}
  }

  static getDerivedStateFromProps( props, state ) {
    state = state || {}
    state.options = parseOptions( props )
    state.value = state.options.value
    return state
  } 

  onSliderInput( slider, input ) {
    if ( 'number' == typeof input ) {
      let key = slider.channels[0]
      let ob = {}
      ob[key] = input
      input = ob
    }

    this.setNext( input )
  }

  setNext( input ) {
    const { state } = this
    let { next, value } = state
    next = next || value.clone()
    next.set( input )
    state.next = next
    this.makeTimer()
  }

  makeTimer() {
    const { state } = this
    let { timer } = state

    if ( !timer ) {
      state.timer = setImmediate( this.onTimer.bind( this ) )
    }
  }

  onTimer() {
    const { state, props, refs } = this
    state.value = state.next.clone()
    state.next = null
    let { value, channels } = state
    
    
    if ( props.onUserInput ) {
      let result = value.toObject( channels )
      props.onUserInput( result )
    }

    if ( refs ) 
      refs.map( ref => ref.setVector( value ) )
    
    state.timer = null
  }

  render() {
    const self = this 
    const { state } = self
    let { options } = state
    let { sliders } = options

    self.refs = []

    sliders = sliders.map( ( slider ) => renderSlider( slider ) )
    return (
      <div className='vector sliders'>
        { sliders }
      </div>
    )

    function renderSlider( slider ) {
      slider.encoding = 'object'
      slider.onUserInput = self.onSliderInput.bind( self, slider )
      slider.ref = slidr => self.refs.push( slidr )
  
      if ( slider.length == 2 )
        return <BoxSlider {...slider} />
  
      if ( slider.length == 1 )
        return <VBoxSlider {...slider} />
    }
  }



  onValueSelf( value ) {
    // console.log( "Vector::onValueSelf", value, this.refs )
    this.setNext( value )
  }
}