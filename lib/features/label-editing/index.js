export default {
  __depends__: [
    require('diagram-js/lib/command').default,
    require('diagram-js/lib/features/change-support').default,
    require('diagram-js/lib/features/resize').default,
    require('diagram-js-direct-editing')
  ],
  __init__: [
    'labelEditingProvider',
    'labelEditingPreview'
  ],
  labelEditingProvider: [ 'type', require('./LabelEditingProvider').default ],
  labelEditingPreview: [ 'type', require('./LabelEditingPreview').default ]
};
