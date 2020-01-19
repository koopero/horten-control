import React from 'react'
import _ from 'lodash'
import Control from '../../base/Control'

class Image extends Control {
  renderMeta() {
    return <span className="resolution">1024x768</span>
  }

  renderSelf() {
    let aspect = 16/9
    return [
      <div className="container" style={{ position: 'relative', width: '100%', paddingBottom: `${100/aspect}%`}}>
        <img src="/image/indian.png" style={{ position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px',width:'100%',height:'100%' }}/>
      </div>
    ]
  }
}

export default Image