'use strict'

require('./index.less')


const _ = require('lodash')
const React = require('react')
const H = require('horten')
const Base = require('../Base')
const Pixel = require('../Pixel')
const Colour = require('deepcolour')
const Background = require('./PixelsBG.js')

class Pixels extends Base {
  constructor( props ) {
    super( props )

    let rows = parseInt( props.rows ) || 0
    let cols = parseInt( props.cols ) || 0
    let size = rows * cols

    this.state.rows = rows
    this.state.cols = cols
    this.state.size = size
    this.state.channels = props.channels || 'rgbhsva'
    this.setPixels( props.pixels )
  }

  componentWillReceiveProps(props) {
    if ( props.pixels ) {
      this.setPixels( props.pixels )
    }
  }

  setPixels( value ) {
    // let colours = string2png.channels( value || '', { channels: this.state.channels, width: this.state.cols, height: this.state.rows } )
    // colours = colours.slice( 0, this.state.size )
    // this.state.colours = colours

    // while ( colours.length < this.state.size ) {
    //   colours.push( new Colour() )
    // }
    this.forceUpdate()
  }

  renderSelf() {
    return (
      <Background/>
    )
  }

  renderGrid() {
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
        <button
          className='seethru'
        />
      )
      return (
        <Pixel
          key={index}
          channels={ self.state.channels }
          colour={ new Colour( self.state.colours && self.state.colours[index] ) }
          onUserInputColour={ ( value ) => self.onCellUserInputColour( index, value ) }
        />
      )
    }
  }

  onCellUserInputColour( index, value ) {
    const colours = this.state.colours
    colours[index].set( value )

    const pixels = colours.map( c => c.toHexChannels( this.state.channels ) ).join(' ')
    this.state.pixels = pixels
    this.onUserInput( pixels )
  }

  onValueSelf( value ) {
    this.setPixels( value )
  }

}

module.exports = Pixels
