import React from 'react'
import _ from 'lodash'
import NumberControl from '../../base/NumberControl'
import VBoxSlider from '../../components/VBoxSlider'


require('./index.less')

class Slider extends NumberControl {
  renderSelf() {
    return (
      <div className='inner'>
        <span className='major'>
          <VBoxSlider
          
          />
          {/* <input
            type="range"
            name="slider"
            step={Number.EPSILON}
            min={0} max={1}
            defaultValue={ this.valueUnit() }
            ref={ (input) => this.inputRange = input }
            onChange={ this.onInputChange.bind( this ) }
          /> */}
          {/* { this.renderMarkers() } */}
        </span>
      </div>
    )
  }
}


export default Slider