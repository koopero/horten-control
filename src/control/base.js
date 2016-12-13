const React = require('react')

const _ = require('lodash')
const H = require('horten')

const Control = require('../HortenControl')
    , Path = require('./Path')

class Base extends React.Component {
  constructor( props ) {
    super( props )

    this.state = this.state || {}


    this.state.type = this.props.type || 'base'
    this.state.path = H.path.string( this.props.path )
    this.state.cursor = new H.Cursor()
    this.state.cursor.path = this.state.path
    this.state.cursor.on('value', this.onCursorValue.bind( this ) )
    this.state.value = this.state.cursor.get()
    this.state.subs = this.props.subs || []

    this.state.hide = parseVisibility( this.props.hide )
    this.state.show = parseVisibility( this.props.show )

    if ( !this.state.value )
      this.state.cursor.patch( {} )

    function parseVisibility( prop ) {
      if ( prop == 'all' )
        return prop

      if ( _.isString( prop ) )
        prop = [ prop ]

      return _( prop )
      .map( ( prop ) => _.split( prop, ',' ) )
      .flatten()
      .map( ( prop ) => _.trim( prop ) )
      .uniq()
      .value()
    }
  }



  componentDidMount() {
    this.state.cursor.listening = true
  }

  componentWillUnmount() {
    this.state.cursor.listening = false
  }


  render() {
    const style = _.pick( this.props, ['clear'] )
    return (
      <span className={'horten control '+this.state.type } style={ style } >
        { this.renderHeader() }
        { this.renderSelf() }
        { this.renderSubs() }
      </span>
    )
  }

  renderHeader() {
    return (
      <header>
        { this.isChildVisible( 'path' ) ?
          <Path path={ this.state.path } pathPrefix={ this.props.pathPrefix }/>
          : undefined
        }
        { this.isChildVisible( 'title' ) ?
          <span className='title'>{ this.state.title || '' }</span>
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

  renderSubs() {
    var path = this.state.path

    return (
      <ul className='subs'>
        { _.map( this.state.subs, Sub ) }
      </ul>
    )
    function Sub( props, index, collection ) {
      props = Object.assign( {}, props, { pathPrefix: path } )

      if ( !props.path && !Array.isArray( collection ) )
        props.path = H.path.resolve( path, index )
      else if ( !props.path )
        props.path = path

      return (<li className='sub' key={index}>
        <Control {...props}/>
      </li>)
    }
  }

  //
  // Child Element Visibility
  //
  isChildVisible( name ) {
    if ( this.state.hide == 'all' ) {
      return this.state.show.indexOf( name ) != -1
    }
    return true
  }


  //
  // Main listener for user input
  //
  onUserInput( value ) {
    if ( this.state.path )
      this.state.cursor.patch( value )
  }

  //
  // Cursor Listeners
  //
  onCursorValue( value ) {
    // console.log('onCursorValue', this.cursor.path, value )
    this.state.value = value
    this.onValueSelf( value )
  }

  onValueSelf( value ) {
    // blank in base
  }
}

module.exports = Base
