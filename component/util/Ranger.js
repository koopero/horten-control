const DEFAULTS = {
  min: 0,
  max: 1,
  pow: 1
}
class Ranger {
  constructor( config ) {
    this.configure( config )
  }

  configure( config ) {
    for ( var k in DEFAULTS ) {
      var v = parseFloat( this[k] )
      if ( config )
        v = parseFloat( config[k] )

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
}
module.exports = Ranger
