const React = require('react')
const VBoxSlider = require('../VBoxSlider')
const Colour = require('deepcolour')

const KEY_TO_CHANNEL = {
  'h': 'hue',
  's': 'saturation',
  'v': 'value',
  'r': 'red',
  'g': 'green',
  'b': 'blue',
  'a': 'alpha',
}

class Pixel extends React.Component {
  constructor( props ) {
    super( props )
    this.state = this.state || {}
    this.state.colour = new Colour()
    this.state.colour.set( props.colour )
    this.state.channels = this.parseChannels( props.channels )
  }


  parseChannels( channels ) {
    if ( Array.isArray( channels ) )
      return channels

    if ( 'string' == typeof channels ) {
      let arr = []
      for ( let i = 0; i < channels.length; i ++ ) {
        let c = channels[i]
        c = c.toLowerCase()
        c = KEY_TO_CHANNEL[c]
        if ( c )
          arr.push( c )
      }

      return arr
    }

    return [ 'red','green','blue' ]
  }


  componentWillReceiveProps( newProps ) {
    if ( newProps.colour ) {
      this.state.colour.set( newProps.colour )
      this.forceUpdate()
    }
  }

  render() {
    return (
      <table className={'pixel pixel-rgb'} >
        <tbody>
          <tr>
            { ( this.state.channels ).map( ( channel ) => (
              <td key={ channel }>
                <VBoxSlider
                  value={ this.getChannel(channel) }
                  colour={ this.state.colour }
                  colourChannel= { channel }
                  onUserInput={ ( value ) => this.onInputChannel(channel, value ) }
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    )
  }



  onInputChannel( channel, value ) {
    const colour = this.state.colour
    switch( channel ) {
      case 'red':
      case 'green':
      case 'blue':
      case 'alpha':
      case 'hue':
      case 'saturation':
      case 'value':

        colour[channel] = value
      break
    }

    this.setState( this.state )
    if ( this.props.onUserInputColour )
      this.props.onUserInputColour( colour )
  }

  getChannel( channel ) {
    switch( channel ) {
      case 'red':
      case 'green':
      case 'blue':
      case 'alpha':
      case 'hue':
      case 'saturation':
      case 'value':
        return this.state.colour[channel]
      break
    }
  }

}

module.exports = Pixel
