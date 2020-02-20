import React from 'react'
import _ from 'lodash'
import Control from '../../base/Control'
import Vector from '../../components/Vector'

class VectorControl extends Control {
  renderSelf() {
    return <Vector {...this.props}
        ref = { self => this.actualSlider = self }
        onUserInput = { v => this.onUserInput( v ) }
      />
  }

  onValueSelf( value ) {
    if ( this.actualSlider ) {
      // console.log( "VectorControl::onValueSelf", value )
      this.actualSlider.onValueSelf( value )
    }
    // blank in base
  }
}


export default VectorControl