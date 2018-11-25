const React = require('react')
const string2png = require('string2png')

module.exports = function PixelsBG( {
  // data = [],
  cols = 4,
  rows = 1,
}) {
  let tmp = 'ff00ff 00ffff ffff00 0000ff'
  let data = string2png.channels( tmp )

  if ( cols == 1 ) 
    return renderAsGradient( 180 )
  
  if ( rows == 1 ) 
    return renderAsGradient( 90 )
  
  return renderAsImg()

  function renderAsGradient( angle ) {
    let result = []
    for ( let i = 0; i < data.length; i ++ ) {
      let y = i / ( data.length-1)
      let r = data[i].hex
      if ( y != 0 && y != 1 )
        r += ' '+Math.round(y*100)+'%'

      result.push( r )
    }

    result = result.join(', ')
    result = `linear-gradient( ${angle}deg, ${result} )`

    let style = {
      backgroundImage: result
    }

    return <div className="pixels-bg" style={style}/>
  }

  function renderAsImg() {
    let img = string2png.datauri( data, { width: cols, height: rows } )
    return <img className="pixels-bg" src={img}/>
  }
}