const _ = require('lodash')
    , React = require('react')

const INNER = {
  float: require('./inner/Float'),
  options: require('./inner/Options'),
  markdown: require('./inner/Markdown'),
  trigger: require('./inner/Trigger')
}

const H = require('horten')

const Path = require('./inner/Path')


class LoopinControl extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {}
    this.path = H.path.string( this.props.path )
    this.cursor = new H.Cursor()
    this.cursor.path = this.path
    this.cursor.on('value', this.onCursorValue.bind( this ) )

    var type = this.props.type

    if ( !type )
      for ( var key in INNER )
        if ( typeof this.props[ key ] != 'undefined' ) {
          type = key
          break
        }

    if ( !type )
      type = 'blank'

    this.state.type = type
    this.state.subs = this.props.subs || []
    this.state.value = this.cursor.get()
  }

  componentDidMount() {
    this.cursor.listening = true
  }

  componentWillUnmount() {
    this.cursor.listening = false
  }

  render() {
    const config = this.props
    var path = config.path
      , title = config.title

    return (
      <div className={'loopin control '+this.state.type }>
        <header>
          <Path path={ path } pathPrefix={ this.props.pathPrefix }/>
          <span className='title'>{ title }</span>
        </header>
        <div className='inner'>
          { this.renderInner() }
        </div>
        { this.renderSubs() }

      </div>
    )
  }

  renderInner() {
    const type = this.state.type
        , Inner = INNER[type]

    if ( Inner ) {
      this.inner = (
        <Inner
          { ...this.props }
          defaultValue={ this.state.value }
          onChange={ this.onInnerChange.bind( this ) }
          ref={ ( inner ) => this.inner = inner }
        />
      )
      return this.inner
    }

    this.inner = null

    return
  }

  renderSubs() {
    const path = this.props.path
    // console.log('renderSubs', this.state.subs )

    return (
      <ul className='subs'>
        { _.map( this.state.subs, Sub ) }
      </ul>
    )
    function Sub( props, index ) {
      props = _.merge( {}, props, { pathPrefix: path } )

      if ( !props.path )
        props.path = H.path.resolve( path, index )

      return (<li className='sub' key={index}>
        <LoopinControl {...props}/>
      </li>)
    }
  }

  onInnerChange( value ) {
    // console.log('onInnerChange', value )
    this.cursor.patch( value )
  }

  onCursorValue( value ) {
    // console.log('onCursorValue', this.inner )
    if ( this.inner && this.inner.valueFoo )
      this.inner.valueFoo( value )
  }
}

module.exports = LoopinControl
