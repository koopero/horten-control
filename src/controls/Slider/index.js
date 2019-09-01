import React from 'react'
import _ from 'lodash'
import NumberControl from '../../base/NumberControl'
import VBoxSlider from '../../components/VBoxSlider'


require('./index.less')

class Slider extends NumberControl {
  renderSelf() {
    return [
      this.renderShort(),

      <VBoxSlider
        ref = { self => this.actualSlider = self }
        onUserInput = { v => this.onUnitInput( v )}
      />
    ]
  }
}


export default Slider