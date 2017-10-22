export default {
  __depends__: [
    require('diagram-js/lib/i18n/translate').default
  ],
  bpmnImporter: [ 'type', require('./BpmnImporter').default ]
};