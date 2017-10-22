export default {
  __init__: [ 'bpmnOrderingProvider' ],
  __depends__: [
    require('diagram-js/lib/i18n/translate').default
  ],
  bpmnOrderingProvider: [ 'type', require('./BpmnOrderingProvider').default ]
};