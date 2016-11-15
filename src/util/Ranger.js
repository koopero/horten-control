const DEFAULTS = {
  min: 0,
  max: 1,
  pow: 1,
  sign: 0,
  digits: 0,
  metric: 0,
  precision: 0
}

class Ranger {
  constructor( config ) {
    this.unit = ''
    this.configure( config )
  }

  configure( config ) {
    if ( config && 'string' == typeof config.unit )
      this.unit = config.unit

    for ( var k in DEFAULTS ) {
      var v = parseFloat( this[k] )
        , arg = config && config[k]

      if ( arg === true )
        arg = 1
      else if ( arg === false )
        arg = 0
      else
        arg = parseFloat( arg )

      if ( !isNaN( arg ) )
        v = arg

      if ( isNaN( v ) )
        v = DEFAULTS[k]

      this[k] = v
    }
  }

  toUnit( v ) {
    // min, max
    v = ( v - this.min ) / ( this.max - this.min )

    // pow
    v = Math.pow( v, 1/this.pow )

    return v
  }

  toPercent( v ) {
    return 100 * this.toUnit( v ) + '%'
  }

  fromUnit( v ) {

    // pow
    v = Math.pow( v, this.pow )

    // min, max
    v = v * ( this.max - this.min ) + this.min

    return v
  }

  toPretty ( num, digits ) {
    digits = ('undefined' == typeof digits) ? Math.floor( this.digits ) : (parseFloat( digits ) || 0)
    var metric = ''
      , unit = this.unit

    if ( this.metric ) {
      var abs = Math.abs( num )
      if ( abs > 1000000000 ) {
        metric = 'M'
        num /= 1000000000
      } else  if ( abs > 1000000 ) {
        metric = 'M'
        num /= 1000000
      } else  if ( abs > 1000 ) {
        metric = 'k'
        num /= 1000
      } else if ( abs )  {
        if ( abs < 1 ) {
          metric = 'm'
          num *= 1000
        }
      }
    }

    if ( unit == '%' ) {
      num *= 100
    }

    if ( isNaN( num ) )
      return 'NaN'

    var int = num.toFixed(0)
      , prefix = num > 0 && this.sign ? '+' : num < 0 ? '' : ''

    digits -= prefix.length + int.length + metric.length
    return prefix +
      ( num.toFixed( Math.max( digits, this.precision ) ) ) + metric + unit

  }


}



module.exports = Ranger
