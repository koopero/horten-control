'use strict'

require('./index.less')


const _ = require('lodash')
const React = require('react')
const H = require('horten')
const Base = require('../Base')
const Pixel = require('../Pixel')
const Colour = require('deepcolour')
const Background = require('./PixelsBG.js')
const VBoxSlider = require('../VBoxSlider')
const string2png = require('string2png')



class Selector extends React.Component {
  render() {
    const onMouseEvent = this.props.onMouseEvent
    const className = ['seethru','fingersize']
    const colour = new Colour( this.props.colour )
    const style = {
      backgroundColor: colour.toCSS()
    }

    if ( this.props.selected )
      className.push('selected') 

    return (
      <button
        onMouseDown={ onMouseEvent }
        className={className.join(' ')}
        style={style}
      />
    )
  }
}


class Pixels extends Base {
  constructor( props ) {
    super( props )
    this.componentWillReceiveProps( props )
  }

  componentWillReceiveProps( props ) {
    let rows = parseInt( props.rows ) || 0
    let cols = parseInt( props.cols ) || 0
    let size = rows * cols

    this.state.rows = rows
    this.state.cols = cols
    this.state.size = size
    this.state.channels = props.channels || 'rgba'
    this.state.sliders = props.sliders || 'hsv rgb a'
    this.state.selected = new Array( size )

    if ( !this.state.colours ) {
      this.state.colours = new Array(size)
      for ( let index = 0; index < size; index ++ )
        this.state.colours[index] = new Colour()
    }

    this.state.colour = new Colour()

    if ( props.pixels ) {
      this.setPixels( props.pixels )
    }
  }

  setPixels( value ) {
    value = value && value.data
    let colours = string2png.channels( value || '', { channels: this.state.channels, width: this.state.cols, height: this.state.rows } )
    colours = colours.slice( 0, this.state.size )

    colours.map( ( colour, index ) => {
      if ( this.state.colours[index] )
        this.state.colours[index].set( colour )
    })

    this.forceUpdate()
  }

  renderSelf() {

    const grid = this.renderGrid()
    const sliders = this.renderSliders()
    
    return (
      <div className='inner'>
        <div className='overlays'>
          { grid }
        </div>
        <div className='sliders'>
          { sliders }
        </div>
      </div>
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
        <Selector
          key={index}
          channels={ self.state.channels }
          selected={ !!self.state.selected[index] }
          colour={ new Colour( self.state.colours && self.state.colours[index] ) }
          onMouseEvent={ ( event ) => self.onCellMouseEvent( index, event) }
          onUserInputColour={ ( value ) => self.onCellUserInputColour( index, value ) }
        />
      )
    }
  }

  renderSliders() {
    let { sliders } = this.state
    sliders = sliders.split('')
    return sliders.map( channel => {
      return channel == " " ? <span class='spacer'> </span> : <VBoxSlider 
        colour={this.state.colour}
        value={this.state.colour.getChannel( channel )}
        colourChannel={channel}
        onUserInput={ value => this.onSetColourChannel( channel, value ) }
      />
    })
  }

  onSetColourChannel( channel, value ) {
    this.state.colour.setChannelByName( channel, value )

    _.map( this.state.selected, ( selected, key ) => {
      if ( !selected ) return

      let index = parseInt( key )

      this.state.colours[ index ] = this.state.colours[ index ] || new Colour()
      this.state.colours[ index ].setChannelByName( channel, value )
    } )

    this.onPixelInput()
    this.forceUpdate()
  }

  onCellMouseEvent( index, event ) {
    const { type } = event
    event = Object.assign( {}, event )
    // console.log('onCellMouseEvent', { index, type, event  } )
    let action
    switch ( type ) {
      case 'mousedown':  
        if ( event.shiftKey || event.ctrlKey ) 
          action = 'add'
        else
          action = 'select'
      break
    }

    if ( 'undefined' != typeof action ) 
      this.doSelectAction( index, action )
  }

  doSelectAction( index, action ) {
    const { state } = this 
    const { size } = state
    let selected = new Array( size )
    for ( let i = 0; i < size; i ++ )   
      switch ( action ) {
        case 'select':
          selected[i] = this.state.selected[i] ? 0 : i == index ? 1 : 0 
        break

        case 'add':
          selected[i] = Math.max( parseFloat( this.state.selected[i] ) || 0, i == index ? 1 : 0 )
        break
      }
      
    
    let colour = new Colour( state.colours[index] )
    this.setState( { selected, colour  } )
  }

  onPixelInput() {
    const { colours, cols } = this.state
    let data = colours.map( c => c.toHexChannels( this.state.channels ) )
    data = data.map( ( pixel, index ) => pixel + ( index % cols == cols - 1 ? '\n' : ' ' ))
    data = data.join('')

    const pixels = {
      format: 'hex',
      data
    }
    this.onUserInput( pixels )
  }

  onValueSelf( value ) {
    this.setPixels( value )
  }

}

module.exports = Pixels
