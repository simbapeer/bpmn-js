export default {
  __init__: [ 'modeling', 'bpmnUpdater' ],
  __depends__: [
    require('./behavior').default,
    require('../label-editing').default,
    require('../rules').default,
    require('../ordering').default,
    require('../replace').default,
    require('diagram-js/lib/command').default,
    require('diagram-js/lib/features/tooltips').default,
    require('diagram-js/lib/features/label-support').default,
    require('diagram-js/lib/features/attach-support').default,
    require('diagram-js/lib/features/selection').default,
    require('diagram-js/lib/features/change-support').default,
    require('diagram-js/lib/features/space-tool').default
  ],
  bpmnFactory: [ 'type', require('./BpmnFactory').default ],
  bpmnUpdater: [ 'type', require('./BpmnUpdater').default ],
  elementFactory: [ 'type', require('./ElementFactory').default ],
  modeling: [ 'type', require('./Modeling').default ],
  layouter: [ 'type', require('./BpmnLayouter').default ],
  connectionDocking: [ 'type', require('diagram-js/lib/layout/CroppingConnectionDocking').default ]
};
