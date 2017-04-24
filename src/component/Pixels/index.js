'use strict'

const _ = require('lodash')
    , React = require('react')
    , H = require('horten')
    , Base = require('../Base')
    , Pixel = require('../Pixel')
    , Colour = require('deepcolour')
    , string2png = require('string2png')

class Pixels extends Base {
  constructor( props ) {
    super( props )

    let rows = parseInt( props.rows ) || 0
    let cols = parseInt( props.cols ) || 0
    let size = rows * cols

    this.state.rows = rows
    this.state.cols = cols
    this.state.size = size
    this.setPixels( props.pixels )
  }

  componentWillReceiveProps(props) {
    if ( props.pixels ) {
      this.setPixels( props.pixels )
    }
  }

  setPixels( value ) {
    let colours = this.state.colours = string2png.channels( value || '' )
    while ( colours.length < this.state.size ) {
      colours.push( new Colour() )
    }
    this.forceUpdate()
  }

  renderSelf() {
    const self = this
    const rows = this.state.rows
    let size = this.state.size
    let width = this.state.cols

    return renderTable()

    function renderTable( ) {
      let indexes = []
      for ( let i = 0; i < rows; i ++ )
        indexes[i] = i * width


      return (
        <table>
          <tbody>
            { indexes.map( renderRow ) }
          </tbody>
        </table>
      )
    }

    function renderRow( index, row ) {
      let indexes = []
      for ( let i = 0; i < width; i ++ )
        indexes[i] = index + i

      return (
        <tr key={row}>
          { indexes.map( ( index ) => (
            <td key={index}>{ renderCell( index ) }</td>
          ) ) }
        </tr>
      )
    }

    function renderCell( index ) {
      return (
        <Pixel
          key={index}
          colour={ new Colour( self.state.colours && self.state.colours[index] ) }
          onUserInputColour={ ( value ) => self.onCellUserInputColour( index, value ) }
        />
      )
    }
  }

  onCellUserInputColour( index, value ) {
    const colours = this.state.colours
    colours[index] = value

    const pixels = colours.map( c => c.hex ).join(' ')
    this.state.pixels = pixels
    this.onUserInput( pixels )
  }

  onValueSelf( value ) {
    this.setPixels( value )
  }

}

module.exports = Pixels
