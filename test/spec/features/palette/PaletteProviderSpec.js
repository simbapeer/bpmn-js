'use strict';

require('../../../TestHelper');

/* global bootstrapModeler, inject */

var modelingModule = require('../../../../lib/features/modeling').default,
    paletteModule = require('../../../../lib/features/palette').default,
    coreModule = require('../../../../lib/core').default;

var domQuery = require('min-dom/lib/query');


describe('features/palette', function() {

  var diagramXML = require('../../../fixtures/bpmn/features/replace/01_replace.bpmn');

  var testModules = [ coreModule, modelingModule, paletteModule ];

  beforeEach(bootstrapModeler(diagramXML, { modules: testModules }));


  it('should provide BPMN modeling palette', inject(function(canvas, palette) {

    // when
    var paletteElement = domQuery('.djs-palette', canvas._container);
    var entries = domQuery.all('.entry', paletteElement);

    // then
    expect(entries.length).to.equal(13);
  }));

});
