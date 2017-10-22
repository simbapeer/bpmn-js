export default {
  __depends__: [
    require('diagram-js/lib/features/palette').default,
    require('diagram-js/lib/features/create').default,
    require('diagram-js/lib/features/space-tool').default,
    require('diagram-js/lib/features/lasso-tool').default,
    require('diagram-js/lib/features/hand-tool').default,
    require('diagram-js/lib/i18n/translate').default,
    require('../global-connect').default
  ],
  __init__: [ 'paletteProvider' ],
  paletteProvider: [ 'type', require('./PaletteProvider').default ]
};
