'use strict';

require('../../../../TestHelper');

/* global bootstrapModeler, inject */

var modelingModule = require('../../../../../lib/features/modeling').default,
    coreModule = require('../../../../../lib/core').default;


describe('features/modeling/behavior - ImportDockingFix', function() {

  var diagramXML = require('./ImportDockingFix.bpmn');

  beforeEach(bootstrapModeler(diagramXML, {
    modules: [
      coreModule,
      modelingModule
    ]
  }));


  it('should correct dockings on import', inject(function(elementRegistry, modeling) {

    // when
    var sequenceFlowConnection = elementRegistry.get('SequenceFlow'),
        associationConnection = elementRegistry.get('DataAssociation_1');

    // then
    expect(sequenceFlowConnection).to.have.startDocking({ x: 191, y: 120 });
    expect(sequenceFlowConnection).to.have.endDocking({ x: 328, y: 120 });

    expect(associationConnection).to.have.startDocking({ x: 437, y: 369 });
    expect(associationConnection).to.have.endDocking({ x: 328, y: 119 });
  }));

});
