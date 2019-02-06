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
      _class: require('./Loader').default
    },
    markdown: {
      _class: require('./Markdown').default
    },
    map: {
      _class: require('./Map').default
    },
    float: {
      type: 'slider'
    },
    slider: {
      _class: require('./Slider').default
    },
    options: {
      _class: require('./Options').default
    },
    trigger: {
      _class: require('./Trigger').default
    },
    text: {
      _class: require('./Text').default
    },
    group: {
      _class: require('./Base').default
    },
    grid: {
      _class: require('./Grid').default
    },
    colour: {
      _class: require('./Colour').default
    },
    page: {
      _class: require('./Page').default
    },
    pixels: {
      _class: require('./Pixels').default
    },
    text: {
      _class: require('./Text').default
    },
    yaml: {
      _class: require('./YAML').default
    }
  }
}
