'use strict'

const _ = require('lodash')
    , React = require('react')
    , H = require('horten')
    , Base = require('./Base')

const Colour = require('deepcolour')

const Pixel = require('./Pixel')

const string2png = require('string2png')

function now() { return new Date().getTime() }

class Pixels extends Base {
  constructor( props ) {
    super( props )

    let rows = parseInt( props.rows ) || 0
    let cols = parseInt( props.cols ) || 0
    let size = rows * cols

    this.state.rows = rows
    this.state.cols = cols
    this.state.size = size
    this.state.colours = string2png.channels( props.pixels )
  }

  componentWillReceiveProps(props) {
    if ( props.pixels ) {
      this.state.colours = string2png.channels( props.pixels )
    }
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

    function renderRow( index ) {
      let indexes = []
      for ( let i = 0; i < width; i ++ )
        indexes[i] = index + i

      return (
        <tr>
          { indexes.map( ( index ) => (
            <td key={index}>{ renderCell( index ) }</td>
          ) ) }
        </tr>
      )
    }

    function renderCell( index ) {
      return (
        <Pixel
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

}

module.exports = Pixels
