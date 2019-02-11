import React from 'react'
import Base from '../../base/Control'
import Trigger from '../../components/Trigger'

require('./index.less')

class TriggerControl extends Base {
  renderSelf() {
    return <Trigger {...this.props}/>
  }
}

export default TriggerControl