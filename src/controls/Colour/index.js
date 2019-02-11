'use strict'

import _ from 'lodash'
import React from 'react'
import deepcolour from 'deepcolour'
import Base from '../../base/Control'
import Slider from '../Slider'

const CHANNEL = {
  type: 'float',
  unit: '%',
  min: 0,
  max: 1,
  markers: [ 0, 1 ]
}

const CHANNELS = {
  r: { key: 'red', title: 'Red' },
  g: { key: 'green', title: 'Green' },
  b: { key: 'blue', title: 'Blue' },
  a: { key: 'alpha', title: 'Alpha' },
  h: {
    key: 'hue',
    title: 'Hue',
    unit: '',
    precision: 2,
    markers: [
      { value: 0, text: 'red' },
      { value: 1/6, text: 'yellow' },
      { value: 2/6, text: 'green' },
      { value: 3/6, text: 'cyan' },
      { value: 4/6, text: 'blue' },
      { value: 5/6, text: 'magenta' },
      { value: 1, text: 'red' }
    ]
  },
  s: { key: 'saturation', title: 'Saturation' },
  v: { key: 'value', title: 'Value' },
  V: {
    key: 'value',
    title: 'Super Value',
    max: 2,
    log: 1.8,
    markers: [ 0, 0.5, 1, 2 ]
  },
  S: {
    key: 'saturation',
    title: 'Super Saturation',
    max: 2,
    markers: [ 0, 1, 2 ]
  }
}

export default class Colour extends Base {
  constructor( props ) {
    super( props )
    this.state.type = 'colour'
    this.state.colour = new (deepcolour)( this.props.colour )
  }

  componentDidMount() {
    super.componentDidMount()
    this.onChannelInput()
  }

  renderSelf() {
    return [
      this.renderSwatch(),
      this.renderChannels(),
      this.renderPalette()
    ]
  }

  renderSwatch() {
    const colour = this.state.colour
      , style = {
        backgroundColor: colour.toHexString()
      }

    return (
      <span key='swatch' className='swatch'><span style={style} ref={ ( swatch ) => this.swatch = swatch } /></span>
    )
  }

  renderPalette() {

  }

  renderChannels() {
    const sliders = {}
    this.sliders = sliders

    const self = this
    let channels = 'hsVa'
    channels = channels.split('')
    channels = channels.map( ( char ) =>
      CHANNELS[ char ] &&
      _.extend( {},
        CHANNEL,
        CHANNELS[ char ]
      )
    )
    channels = _.filter( channels )
    channels = channels.map( ( props, id ) => (
      <span key={ id } className='channel' >
        <Slider
          {...props }
          onUserInput = { self.onChannelInput.bind( self, props.key ) }
          ref={ ( slider ) => sliderRef( props.key, slider ) }
        />
      </span>
    ) )

    return channels 
      


    function sliderRef( key, ref ) {
      if ( !sliders[key] )
        sliders[key] = []

      sliders[key].push( ref )
    }
  }

  onValueSelf( value ) {
    this.state.colour.set( value )
    this.setColourUI()
  }

  onChannelInput( key, value ) {

    if ( key ) {
      this.state.colour[key] = value
    }

    this.setColourUI()
    this.onUserInput( this.state.colour.toObject(['red','green','blue','alpha'] ) )
  }

  setColourUI() {
    const css = this.state.colour.css

    this.swatch.style.backgroundColor = css

    const self = this
    _.map( this.sliders, function( sliders, key ) {
      const value = self.state.colour[key]
      _.map( sliders, function( slider ) {
        slider.onCursorValue( value )
      })
    } )

  }
}
