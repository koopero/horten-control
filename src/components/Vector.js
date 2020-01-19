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
  options.value = new options.space().toArray()

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
  static getDerivedStateFromProps( props, state ) {
    state = state || {}
    state.options = parseOptions( props )
    return state
  } 

  render() {
    let { state } = this
    let { options } = state
    let { sliders } = options

    sliders = sliders.map( renderSlider )
    return [ 
      // <YAML data={this.state }/>,
      <div className='sliders'>
        { sliders }
      </div>
    ]

    function renderSlider( slider ) {
      if ( slider.length == 2 )
        return <BoxSlider {...slider} />

      if ( slider.length == 1 )
        return <VBoxSlider {...slider} />
    }
  }
}