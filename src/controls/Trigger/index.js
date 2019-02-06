const React = require('react')
const Base = require('../Base')
const Trigger = require('../../components/Trigger')

require('./index.less')

class TriggerControl extends Base {
  renderSelf() {
    return <Trigger {...this.props}/>
  }
}

module.exports = TriggerControl