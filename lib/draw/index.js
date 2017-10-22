export default {
  __init__: [ 'bpmnRenderer' ],
  bpmnRenderer: [ 'type', require('./BpmnRenderer').default ],
  pathMap: [ 'type', require('./PathMap').default ]
};
