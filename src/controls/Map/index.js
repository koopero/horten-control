'use strict'

import _ from 'lodash'
import React from 'react'
import Base from '../Base'

export default class Map extends Base {
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
}

