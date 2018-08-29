'use strict'

const _ = require('lodash')
    , React = require('react')
    , Base = require('../Base')
    , Trigger = require('../Trigger')

class Map extends Base {
  constructor( props ) {
    super( props )
    this.state.type = 'grid'
  }

  propsToState( props ) {
    let state = super.propsToState( props )
    state.cursor.on('keys', this.onCursorKeys.bind( this ) )
    state.subs = {}
    state.cursor.mutant.keys().map( key => {
      state.subs[key] = {}
    })
    return state
  }

  onCursorKeys( keys ) {
    let subs = {}
    keys.map( key => {
      subs[key] = {}
    })
    this.setState( Object.assign( {}, this.state, { keys, subs } ) )
  }

  // renderSelf() {
  //   const cursor = this.state.cursor 
  //   let keys = this.state.keys || []
  //   return "HELLO "+JSON.stringify( this.state.subs )
  // }
}

module.exports = Map
