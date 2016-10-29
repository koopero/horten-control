const React = require('react')

const INNER = {
  float: require('./inner/Float'),
  options: require('./inner/Options'),
  markdown: require('./inner/Markdown'),
  trigger: require('./inner/Trigger')
}

const Path = require('./inner/Path')

class LoopinControl extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {}

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
  }


  render() {
    const config = this.props
    var path = config.path
      , title = config.title


    console.log('LoopinControl', this.props )

    return (
      <div className={'loopin control '+this.state.type }>
        <header>
          <Path path={ path }/>
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

    if ( Inner )
      return (
        <Inner { ...this.props } />
      )

    return
    // return <Float { ...this.props }/>
  }

  renderSubs() {
    return (
      <div className='subs'>

      </div>
    )
  }
}

module.exports = LoopinControl
