export default {
  __depends__: [
    require('diagram-js/lib/features/copy-paste').default
  ],
  __init__: [ 'bpmnCopyPaste' ],
  bpmnCopyPaste: [ 'type', require('./BpmnCopyPaste').default ]
};
