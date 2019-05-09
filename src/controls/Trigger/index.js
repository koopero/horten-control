import React from 'react'
import Base from '../../base/Control'
import Trigger from '../../components/Trigger'

require('./index.less')

class TriggerControl extends Base {
  renderSelf() {
    let title = this.props.title || ''
    return <Trigger {...this.props} title={title}/>
  }
}

export default TriggerControl