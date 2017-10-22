export default {
  __depends__: [
    require('diagram-js/lib/features/popup-menu').default,
    require('../replace').default
  ],
  __init__: [ 'replaceMenuProvider' ],
  replaceMenuProvider: [ 'type', require('./ReplaceMenuProvider').default ]
};