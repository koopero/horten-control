module.exports = function floatToStr ( num, digits ) {
  if ( 'undefined' == typeof digits )
    digits = 6

  if ( isNaN( num ) )
    return ' NaN '

  var int = num.toFixed(0)
    , prefix = num > 0 ? '+' : num < 0 ? '' : ''

  digits -= prefix.length + int.length
  return prefix +
    ( digits > 0 ?
      num.toFixed( digits )
      : int )

}
