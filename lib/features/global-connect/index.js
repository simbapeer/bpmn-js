export default {
  __depends__: [
    require('diagram-js/lib/features/global-connect').default
  ],
  __init__: [ 'bpmnGlobalConnect' ],
  bpmnGlobalConnect: [ 'type', require('./BpmnGlobalConnect').default ]
};
