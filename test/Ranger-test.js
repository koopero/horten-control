const assert = require('chai').assert
describe('ranger',() => {
  const Ranger = require('../component/util/Ranger')
  it("Doesn't smoke", () => {
    const ranger = new Ranger()
        , value = Math.random()

    assert.equal( ranger.toUnit( value ), value )
  })

  it('max', () => {
    const ranger = new Ranger()
        , max = 3
        , value = Math.random()

    ranger.max = max

    assert.equal( ranger.fromUnit( value / max ), value )
    assert.equal( ranger.toUnit( value ), value / max )
  })

  it('min', () => {
    const ranger = new Ranger()
    ranger.min = -1

    assert.equal( ranger.fromUnit( 0.5 ), 0 )
    assert.equal( ranger.toUnit( 0 ), 0.5 )
  })

  describe('pow', () => {
    it('works', () => {
      const ranger = new Ranger( {
        pow: 2,
        max: 100
      })
      assert.equal( ranger.fromUnit( 0.5 ), 25 )
      assert.equal( ranger.toUnit( 25 ), 0.5 )
    })
  })

  describe('toPretty', () => {
    it('does float', () => {
      const ranger = new Ranger( {

      } )
      assert.equal( ranger.toPretty( 0 ), '0.0000')
      assert.equal( ranger.toPretty( 0.5 ), '0.5000')
      assert.equal( ranger.toPretty( -0.5 ), '-0.500')


    })

    it('unit', () => {
      const ranger = new Ranger( {
        digits: 0,
        unit: 'mm'
      } )
      assert.equal( ranger.toPretty( 0 ), '0mm' )
      assert.equal( ranger.toPretty( 100 ), '100mm' )

    })

    it('precision', () => {
      var ranger = new Ranger( {
        digits: 0,
        precision: 2
      } )
      assert.equal( ranger.toPretty( 0 ), '0.00' )
      assert.equal( ranger.toPretty( 100 ), '100.00' )

      var ranger = new Ranger( {
        digits: 0,
        precision: 3
      } )

      assert.equal( ranger.toPretty( 0 ), '0.000' )
      assert.equal( ranger.toPretty( 100 ), '100.000' )

    })

    it('percent', () => {
      const ranger = new Ranger( {
        digits: 0,
        precision: 0,
        unit: '%'
      } )
      assert.equal( ranger.toPretty( 0.25 ), '25%' )
      assert.equal( ranger.toPretty( 2 ), '200%' )
      assert.equal( ranger.toPretty( 0 ), '0%' )

    })

    it('metric', () => {
      const ranger = new Ranger( {
        metric: true
      } )
      assert.equal( ranger.toPretty( 10000 ), '10.00k' )
      assert.equal( ranger.toPretty( 20000000 ), '20.00M' )
      assert.equal( ranger.toPretty( 3/1000 ), '3.000m' )

    })
  })
})
