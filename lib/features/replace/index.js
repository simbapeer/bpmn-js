export default {
  __depends__: [
    require('diagram-js/lib/features/replace').default,
    require('diagram-js/lib/features/selection').default
  ],
  bpmnReplace: [ 'type', require('./BpmnReplace').default ]
};
