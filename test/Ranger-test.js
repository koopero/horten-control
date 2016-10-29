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
})
