export default {
  __depends__: [
    require('diagram-js/lib/features/align-elements').default,
    require('diagram-js/lib/features/editor-actions').default,
    require('diagram-js/lib/features/hand-tool').default,
    require('diagram-js/lib/features/lasso-tool').default,
    require('diagram-js/lib/features/space-tool').default,
    require('../global-connect').default,
    require('../copy-paste').default,
    require('../distribute-elements').default,
    require('../search').default,
    require('../modeling').default
  ],
  editorActions: [ 'type', require('./BpmnEditorActions').default ]
};
