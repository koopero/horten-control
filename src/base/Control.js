import React from 'react'

import _ from 'lodash'
import H from 'horten'

import ControlFromProps from '../controls/Control'
import Path from '../components/Path'

export default class Control extends React.Component {
  constructor( props ) {
    super( props )
    this.state = this.propsToState( props )
  }

  componentWillReceiveProps( props  ) {
    this.setState( this.propsToState( props ) )
  }

  propsToState( props ) {
    let state = {}

    state.type = props.type || 'base'
    state.path = props.path && H.path.string( props.path )
    state.cursor = new H.Cursor()
    state.cursor.delay = 0
    state.cursor.echo = false
    state.cursor.path = state.path
    state.cursor.on('value', this.onCursorValue.bind( this ) )
    state.value = state.cursor.get()
    state.subs = props.subs || []
    state.hide = parseVisibility( props.hide )
    state.show = parseVisibility( props.show )
    state.cols = parseInt( props.cols )
    state.rows = parseInt( props.rows )

    if ( isNaN( state.cols ) ) state.cols = 0
    if ( isNaN( state.rows ) ) state.rows = 0

    if ( props.code && _.isString( props.code ) )
      state.code = props.code

    return state

    function parseVisibility( prop ) {
      if ( prop == 'all' )
        return prop

      if ( _.isString( prop ) )
        prop = [ prop ]

      prop = _.map( prop, ( prop ) => _.split( prop, ',' ) )
      prop = _.flatten( prop )
      prop = _.map( prop, ( prop ) => _.trim( prop ) )
      prop = _.uniq( prop )
      prop = _.value( prop )

      return prop
    }
  }


  componentDidMount() {
    if ( this.state.path ) {
      this.state.cursor.listening = true

      let value = this.state.cursor.value

      if ( 'undefined' == typeof value && 'undefined' != typeof this.props.default ) {
        this.state.cursor.value = this.props.default
        value = this.state.cursor.value
      }

      this.onCursorValue( value )
    }
  }

  componentWillUnmount() {
    this.state.cursor.listening = false
  }


  render() {
    const style = _.pick( this.props, ['clear'] )
    let className = 'horten control'
    className += ' '+this.state.type
    className += ' '+this.renderControlWidthClasses()

    return (
      <span className={ className } style={ style } >
        { this.renderHeader() }
        { this.renderSelf() }
        { this.renderSubs() }
      </span>
    )
  }

  renderControlWidthClasses() {
    let classes = ''

    if ( this.state.cols )
      classes += ' grid-cols-'+this.state.cols

    return classes
  }

  renderControlHeightClasses() {
    let classes = ''
    if ( this.state.rows )
      classes += ' grid-rows-'+this.state.rows

    return classes
  }


  renderHeader() {
    return (
      <header>
        { this.isChildVisible( 'path' ) ?
          <Path path={ this.state.path } pathPrefix={ this.props.pathPrefix }/>
          : undefined
        }
        { this.isChildVisible( 'title' ) ?
          <span className='title'>{ this.props.title || '' }</span>
          : undefined
        }

        { this.isChildVisible( 'tools' ) ?
          this.renderTools()
          : undefined
        }

        { this.isChildVisible( 'short' ) ?
        this.renderShort()
        : undefined
        }

        { this.isChildVisible( 'description' ) && this.props.description  ?
          <span className='description'>{ this.props.description || '' }</span>
          : undefined
        }


      </header>
    )
  }

  renderSelf() {
  }

  renderTools() {

  }

  renderShort() {

  }

  renderSubs() {
    var path = this.state.path
      , template = this.props.sub
      , copy = {
        meta: this.props.meta
      }

    if ( _.isString( template ) )
      template = { type: template }

    return (
      <div className='subs'>
        { _.map( this.state.subs, Sub ) }
        <span className='clearfix'>{ ' ' }</span>
      </div>
    )
    function Sub( props, index, collection ) {
      if ( _.isString( props ) )
        props = { type: props }
      props = Object.assign( {}, template, props, copy, { pathPrefix: path } )

      if ( !props.path && !Array.isArray( collection ) )
        props.path = H.path.resolve( path, index )
      else if ( !props.path )
        props.path = path

      return (<span className='sub' key={index}>
        <ControlFromProps {...props}/>
      </span>)
    }
  }

  //
  // Child Element Visibility
  //
  isChildVisible( name ) {
    if ( this.state.hide == 'all' ) {
      return this.state.show.indexOf( name ) != -1
    }

    if ( Array.isArray( this.state.hide ) )
      if ( this.state.hide.includes( name ) )
        return false 

    return true
  }


  //
  // Main listener for user input
  //
  onUserInput( value ) {
    if ( this.props.onUserInput )
      this.props.onUserInput( value )

    if ( this.state.path )
      this.state.cursor.patch( value )
  }

  //
  // Cursor Listeners
  //
  onCursorValue( value ) {
    // console.log('onCursorValue', this.state.cursor.path, value )
    this.state.value = value
    this.onValueSelf( value )
  }

  onValueSelf( value ) {
    // blank in base
  }
}
