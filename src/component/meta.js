module.exports = {
  propToType: {
    src: 'loader',
    float: 'float',
    options: 'options',
    markdown: 'markdown',
    yaml: 'yaml',
    trigger: 'trigger',
    text: 'text'
  },
  type: {
    loader: require('./Loader'),
    markdown: require('./Markdown'),
    float: require('./Slider'),
    slider: require('./Slider'),
    options: require('./Options'),
    trigger: require('./Trigger'),
    text: require('./Text'),
    group: require('./Base'),
    grid: require('./Grid'),
    colour: require('./Colour'),
    page: require('./Page'),
    pixels: require('./Pixels')
  }
}
