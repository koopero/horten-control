'use strict'

const _ = require('lodash')
    , React = require('react')
    , Base = require('./base')
    , Slider = require('./Slider')

class Colour extends Base {
  constructor( props ) {
    super( props )
    this.state.type = 'colour'
  }

  renderSelf() {
    const self = this
    var channels = ['hue','saturation','alpha']
    channels = channels.map( function ( channel ) {
      if ( _.isString( channel ) )
        channel = { name: channel }

      channel.path = H.path.resolve( self.path, channel.name )

      return channel
    }


    return _.map( channels, function ( channel ) {
      return ( <Slider {...channel }/> )
    } )
  }
}

module.exports = Colour
