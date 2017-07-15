module.exports = {
  propToType: {
    src: 'loader',
    float: 'float',
    options: 'options',
    markdown: 'markdown',
    trigger: 'trigger',
    text: 'text'
  },
  type: {
    loader: {
      _class: require('./Loader')
    },
    markdown: {
      _class: require('./Markdown')
    },
    float: {
      type: 'slider'
    },
    slider: {
      _class: require('./Slider')
    },
    options: {
      _class: require('./Options')
    },
    trigger: {
      _class: require('./Trigger')
    },
    text: {
      _class: require('./Text')
    },
    group: {
      _class: require('./Base')
    },
    grid: {
      _class: require('./Grid')
    },
    colour: {
      _class: require('./Colour')
    },
    page: {
      _class: require('./Page')
    },
    pixels: {
      _class: require('./Pixels')
    },
    text: {
      _class: require('./Text')
    }
  }
}
