export default {
  __init__: [ 'bpmnAutoResize', 'bpmnAutoResizeProvider' ],
  bpmnAutoResize: [ 'type', require('./BpmnAutoResize').default ],
  bpmnAutoResizeProvider: [ 'type', require('./BpmnAutoResizeProvider').default ]
};
