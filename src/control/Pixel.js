const React = require('react')
const VBoxSlider = require('./VBoxSlider')
const Colour = require('deepcolour')

class Pixel extends React.Component {
  constructor( props ) {
    super( props )
    this.state = this.state || {}
    this.state.colour = new Colour()
    this.state.colour.set('cyan')
    this.state.colour.set( props.colour )
  }



  render() {
    return (
      <table className={'pixel pixel-rgb'} >
        <tbody>
          <tr>
            { ([ 'red','green','blue' ]).map( ( channel ) => (
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
