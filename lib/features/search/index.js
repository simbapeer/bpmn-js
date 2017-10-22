export default {
  __depends__: [
    require('diagram-js/lib/features/search-pad').default
  ],
  __init__: [ 'bpmnSearch'],
  bpmnSearch: [ 'type', require('./BpmnSearchProvider').default ]
};
