'use strict'

import _ from 'lodash'
import React from 'react'
import Base from '../../base/Control'
import Trigger from '../../components/Trigger'

import H from 'horten'



export default class Map extends Base {
  constructor( props ) {
    super( props )
    this.state.type = 'grid'
    this.resolveKeys()
  }

  componentDidMount() {
    super.componentDidMount()
    this.resolveKeys()
  }

  resolveKeys( keys ) {
    var state = this.state = this.state || {}
    keys = keys || this.props.keys

    keys = state.cursor.mutant.keys()

    let subs = keys.map( ( key, index ) => ({
      key,
      path: H.path.resolve( state.path, key ),
    }))

    if ( this.props.type == 'tabs' )
      subs = subs.filter( sub => sub.key == state.key )

    return this.setState({ subs, keys })
  }

  renderSelf() {
    const self = this
    let state = this.state
    let keys = state.keys || []

    return (
      <div className='options'>{ keys.map( Option ) }</div>
    )

    function Option( key, index ) {
      var classes = ['button','option']

      if ( key == state.key ) 
        classes.push( 'selected' )
      else 
        classes.push( 'unselected' )

      if ( index == 0 )
        classes.push('first')

      classes = classes.join(' ')

      return (
        <a
          className={ classes }
          onClick={ () => self.setKey( key ) }
          key={index}
        >{ key }</a>
      )
    }
  }

  setKey( key ) {
    this.state.key = key
    this.resolveKeys()
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
    // let subs = {}
    this.resolveKeys()
    // this.setState( Object.assign( {}, this.state, { keys, subs } ) )
  }
}

