require('./index.less')

import _ from 'lodash'
import React from 'react'
import Base from '../Base'
import Colour from 'deepcolour'
import VBoxSlider from '../VBoxSlider'
import string2png from 'string2png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faEyeDropper, faPaintBrush, faMousePointer, faDrum, faCheckSquare, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const MODE_TO_ICON = {
  'none': faBed,
  'dropper': faEyeDropper,
  'paint': faPaintBrush,
  'select': faMousePointer,
  'drum': faDrum,
  'check': faCheckSquare,
}


class Selector extends React.Component {
  render() {
    const onMouseEvent = this.props.onMouseEvent
    const className = ['button', 'pixel', 'seethru' ]
    const colour = new Colour( this.props.colour )
    const style = {
      backgroundColor: colour.toCSS()
    }

    className.push( this.props.selected  ? 'selected' : 'unselected') 

    return (
      <div
        onMouseDown={ onMouseEvent }
        onMouseUp={ onMouseEvent }
        onMouseEnter={ onMouseEvent }
        onMouseLeave={ onMouseEvent }

        className={className.join(' ')}
        style={style}
      ></div>
    )
  }
}


export default class Pixels extends Base {
  constructor( props ) {
    super( props )
    this.componentWillReceiveProps( props )
  }

  componentWillReceiveProps( props ) {
    super.componentWillReceiveProps( props )

    let height = parseInt( props.height )
    let width = parseInt( props.width )
    
    if ( isNaN( width ) ) width = 1
    if ( isNaN( height ) ) height = 1


    let size = height * width

    this.state.height = height
    this.state.width = width
    this.state.size = size
    this.state.channels = props.channels || 'rgba'
    this.state.sliders = props.sliders || 'hsv rgb a'
    this.state.selected = new Array( size )

    this.state.mode = props.mode || this.state.mode || 'paint'

    this.state.modes = [ 'paint', 'drum', 'dropper','select', 'check'  ]

    if ( !this.state.colour )
      this.state.colour = new Colour()

    this.state.colour.set( props.colour )

    if ( !this.state.colours ) {
      this.state.colours = new Array(size)
      for ( let index = 0; index < size; index ++ )
        this.state.colours[index] = new Colour( this.state.colour )
    }

    if ( props.pixels ) {
      this.setPixels( props.pixels )
    }
  }

  setPixels( value ) {
    value = value && value.data
    let colours = string2png.channels( value || '', { channels: this.state.channels, width: this.state.width, height: this.state.height } )
    colours = colours.slice( 0, this.state.size )

    colours.map( ( colour, index ) => {
      if ( this.state.colours[index] )
        this.state.colours[index].set( colour )
    })

    this.forceUpdate()
  }

  renderSelf() {

    const grid = this.renderGrid()
    const sliders = this.isChildVisible('sliders') && this.state.mode != 'none' && this.renderSliders()
    const mode = this.state.mode
    let rows = Math.max( 0 , this.state.rows - 1 )
    let className = `inner pixels-mode-${mode}`
    className += ` grid-rows-${rows}`

    return (
      <table className={className}>
        <tr>
          { sliders }
          <td className="delim"><FontAwesomeIcon icon={faArrowCircleRight} /></td>
          <td className="grid">{ grid }</td>
        </tr>
      </table>
    )
  }

  renderTools() {
    const modes = this.isChildVisible('modes') && this.renderModes()
    return [ super.renderTools(), modes ]
  }

  renderGrid() {
    const self = this
    const height = this.state.height
    let size = this.state.size
    let width = this.state.width

    return renderTable()

    function renderTable( ) {
      let indexes = []
      for ( let i = 0; i < height; i ++ )
        indexes[i] = i * width

      let rows = Math.max( 0 , self.state.rows - 1 )

      return (
        <table className={`grid-rows-${rows}`}>
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
            <td key={index} style={{ height: `${100/height}%`}}>{ renderCell( index ) }</td>
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

  renderModes() {
    const { state } = this
    let { modes } = state

    modes =  modes.map( ( mode, index ) => {
      let selected = mode == state.mode
      let icon = MODE_TO_ICON[mode]
      let className = 'button option icon'
      className += selected ? ' selected' : ' unselected'

      if ( !icon )
        return

      return <button
        onClick={ event => this.onModeClick( mode ) }
        className={ className }
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    })

    return modes
  }

  onModeClick( mode ) {
    this.setMode( mode )
  }

  setMode( mode ) {
    switch( mode ) {
    case 'none':
    case 'dropper':
    case 'paint':
    case 'drum':
      this.doDeselectAll()
    }
    this.setState( { mode } )
  }


  renderSliders() {
    let { sliders } = this.state
    sliders = sliders.split('')
    sliders = sliders.map( channel => {
      return channel == ' ' ? <td className='spacer'>&nbsp;</td> : <td className='vslider'><VBoxSlider 
        colour={this.state.colour}
        value={this.state.colour.getChannel( channel )}
        colourChannel={channel}
        onUserInput={ value => this.onSetColourChannel( channel, value ) }
      /></td>
    })

    return sliders
  }

  onSetColourChannel( channel, value ) {
    let colour = this.state.colour
    let orig = colour.getChannel( channel )
    colour.setChannel( channel, value )
    let delta = value - orig

    _.map( this.state.selected, ( selected, key ) => {
      if ( !selected ) return
      if ( 'boolean' == typeof selected )
        selected = selected ? 1 : 0

      let index = parseInt( key )

      let colour = this.state.colours[ index ] = this.state.colours[ index ] || new Colour()
      let orig = colour.getChannel( channel )

      colour.setChannel( channel, orig + delta * selected )
    } )

    this.onPixelInput()
    this.forceUpdate()
  }

  onCellMouseEvent( index, event ) {
    const { type } = event
    event = Object.assign( {}, event )
    let action
    switch ( type ) {
    case 'mousedown':  
      this.doCellTouch( index, event.shiftKey || event.ctrlKey )
      break

    case 'mouseenter':
      if ( event.buttons )
        this.doCellTouch( index, event.shiftKey || event.ctrlKey )
      break

    case 'mouseleave':
    case 'mouseup':
      this.doCellUntouch( index )
      break
    }
  }

  doCellTouch( index, modifier ) {
    const { state } = this 
    let { mode } = state

    if ( mode == 'select' && modifier )
      mode = 'check'

    switch ( mode ) {
    case 'dropper':
      this.doSetColourFromCell( index )
      break

    case 'select':
      this.doSetColourFromCell( index )
      this.doSelectSingle( index )
      break

    case 'check':
      this.doSelectInverse( index )
      break

    case 'drum':
      this.doSaveCell( index )
      this.doSelectSet( index )

    case 'paint':
      this.doPaintCell( index )
      break
    }
  }

  doCellUntouch( index ) {
    const { state } = this 
    const { mode } = state

    switch ( mode ) {
    case 'drum':
      this.doRestoreCell( index )
      this.doDeselectCell( index )
      break
    }
  }

  doDeselectAll() {
    let selected = {}
    this.setState( { selected } )
  }

  doSelectSet( index ) {
    let selected = {}
    selected[index] = 1
    this.setState( { selected } )
  }

  doSaveCell( index ) {
    const { state } = this
    state.saved = state.saved || {}
    if ( !state.saved[index] )
      state.saved[index] = new Colour( state.colours[index] )
  }

  doRestoreCell( index ) {
    const { state } = this

    if ( state.saved && state.saved[index] ) {
      state.colours[ index ] = state.saved[index]
      state.saved[index] = null

      this.onPixelInput()
      this.forceUpdate()  
    }
  }


  doSelectSingle( index ) {
    let selected = {}
    selected[index] = 1
    this.setState( { selected } )
  }

  doDeselectCell( index ) {
    let selected = Object.assign( {}, this.state.selected )
    selected[index] = 0
    this.setState( { selected } )
  }

  doSelectInverse( index ) {
    let selected = Object.assign( {}, this.state.selected )
    selected[index] = !selected[index] ? 1 : 0
    this.setState( { selected } )
  }

  doSetColourFromCell( index ) {
    const { state } = this 
    let colour = new Colour( state.colours[index] )
    this.setState( { colour } )    
  }

  doPaintCell( index ) {
    this.state.colours[ index ] = this.state.colours[ index ] || new Colour()
    this.state.colours[ index ].set( this.state.colour )

    this.onPixelInput()
    this.forceUpdate()    
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
    const { colours, width, height } = this.state
    let data = colours.map( c => c.toHexChannels( this.state.channels ) )
    data = data.map( ( pixel, index ) => '#' + pixel + ( index % width == width - 1 ? '\n' : ' ' ))
    data = data.join('')

    const pixels = {
      format: 'hex',
      width, height,
      data
    }
    this.onUserInput( pixels )
  }

  onValueSelf( value ) {
    this.setPixels( value )
  }

}
