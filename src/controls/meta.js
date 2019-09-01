module.exports = {
  propToType: {
    src: 'loader',
    float: 'float',
    options: 'options',
    markdown: 'markdown',
    display: 'display',
    trigger: 'trigger',
    text: 'text',
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
    display: {
      _class: require('./YAML').default
    },
    float: {
      type: 'slider'
    },
    number: {
      type: 'slider'
    },
    slider: {
      _class: require('./Slider').default,
      cols: 3,
      rows: 1,
    },
    options: {
      _class: require('./Options').default,
      cols: 3,
    },
    trigger: {
      _class: require('./Trigger').default,
      cols: 3,
    },
    toggle: {
      _class: require('./Trigger').default,
      toggle: true,
    },
    tabs: {
      _class: require('./Map').default
    },
    text: {
      _class: require('./Text').default
    },
    group: {
      _class: require('../base/Control').default
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
      _class: require('./Pixels').default,
      cols: 6,
      rows: 4,
    },
    text: {
      _class: require('./Text').default
    },
    yaml: {
      _class: require('./YAML').default,
      cols: 3,
    },
    collector: {
      _class: require('./Collector').default
    }
  }
}
