import React from 'react'
import _ from 'lodash'
import Control from '../../base/Control'
import Vector from '../../components/Vector'

class VectorControl extends Control {
  renderSelf() {
    return [
      <Vector {...this.props}/>
    ]
  }
}


export default VectorControl