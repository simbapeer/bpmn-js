export default {
  __depends__: [
    require('diagram-js/lib/features/distribute-elements').default
  ],
  __init__: [ 'bpmnDistributeElements' ],
  bpmnDistributeElements: [ 'type', require('./BpmnDistributeElements').default ]
};
