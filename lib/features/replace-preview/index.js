export default {
  __depends__: [ require('diagram-js/lib/features/preview-support').default ],
  __init__: [ 'bpmnReplacePreview' ],
  bpmnReplacePreview: [ 'type', require('./BpmnReplacePreview').default ]
};
