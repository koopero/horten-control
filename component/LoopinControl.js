const React = require('react')

const Float = require('./inner/Float')

class LoopinControl extends React.Component {
  render() {
    const config = this.props
    var path = config.path

    console.log('LoopinControl', this.props )

    return <div className='loopin control'>
      <span className='loopin path'>{ path }</span>
      <div className='loopin inner'>
        { this.renderInner() }
      </div>
    </div>
  }

  renderInner() {
    return <Float { ...this.props }/>
  }
}

module.exports = LoopinControl
