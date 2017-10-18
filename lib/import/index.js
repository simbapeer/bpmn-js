export default {
  __depends__: [
    require('diagram-js/lib/i18n/translate')
  ],
  bpmnImporter: [ 'type', require('./BpmnImporter') ]
};