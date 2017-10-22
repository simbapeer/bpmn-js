export default {
  __depends__: [
    require('diagram-js/lib/features/keyboard').default
  ],
  __init__: [ 'bpmnKeyBindings' ],
  bpmnKeyBindings: [ 'type', require('./BpmnKeyBindings').default ]
};
