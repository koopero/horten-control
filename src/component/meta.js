module.exports = {
  propToType: {
    src: 'loader',
    float: 'float',
    options: 'options',
    markdown: 'markdown',
    yaml: 'yaml',
    trigger: 'trigger'
  },
  type: {
    loader: require('./Loader'),
    markdown: require('./Markdown'),
    float: require('./Slider'),
    options: require('./Options'),
    trigger: require('./Trigger'),
    group: require('./Base'),
    grid: require('./Grid'),
    colour: require('./Colour'),
    page: require('./Page'),
    pixels: require('./Pixels')
  }
}
