export default {
  __depends__: [
    require('diagram-js/lib/features/rules').default
  ],
  __init__: [ 'bpmnRules' ],
  bpmnRules: [ 'type', require('./BpmnRules').default ]
};
