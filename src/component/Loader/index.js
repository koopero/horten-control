const request = require('browser-request')
    , React = require('react')
    , yaml = require('js-yaml')

const Control = require('../Control')

class Loader extends React.Component {
  constructor(props) {
    super( props )
    this.state = {
      url: props.src,
      loading: true
    }
  }

  componentDidMount() {
    if ( this.state.url )
      this.load()
  }

  load( url ) {
    const self = this
    url = url || this.state.url
    request( {
      url: url
    }, function ( err, response, body ) {
      try {
        var data = yaml.safeLoad( body )
      } catch ( e ) {
        // console.error('Yaml error', e )
        // Nope, wasn't yaml.
      }

      if ( data ) {
        self.setState( { control: data } )
      } else if ( body ) {
        self.setState( { control: { markdown: body } } )
      }

    })
  }

  render() {
    const control = this.state.control
    if ( Array.isArray( control ) ) {
      return (
        <Control subs={control} meta={ this.props.meta }/>
      )
    } else if ( control ) {
      return (
        <Control {...control} meta={ this.props.meta }/>
      )
    } else {
      return (
        <div className='loader'/>
      )
    }
  }
}

module.exports = Loader
