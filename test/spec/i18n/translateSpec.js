'use strict';

// skipping this file during translation extraction
var skip = window.__env__ && window.__env__.TRANSLATIONS === 'enabled';

require('test/TestHelper').default;

/* global bootstrapModeler, inject */

var coreModule = require('lib/core').default,
    translateModule = require('diagram-js/lib/i18n/translate').default,
    customTranslateModule = require('./custom-translate').default,
    modelingModule = require('lib/features/modeling').default,
    paletteModule = require('lib/features/palette').default,
    contextPadModule = require('lib/features/context-pad').default;

var diagramXML = require('test/fixtures/bpmn/simple.bpmn');


skip ? describe.only : describe('i18n - translate', function() {


  beforeEach(bootstrapModeler(diagramXML, {
    modules: [
      coreModule,
      modelingModule,
      paletteModule,
      contextPadModule,
      translateModule,
      customTranslateModule
    ]
  }));


  it('should translate palette', inject(function(palette) {

    // when
    var handToolEntry = palette.getEntries()['hand-tool'];

    // then
    expect(handToolEntry.title).to.equal('Activar herramienta mano');
  }));


  it('should translate context pad', inject(function(contextPad) {

    // given
    contextPad.open('Task_1');

    // when
    var deleteEntry = contextPad._current.entries.delete;

    // then
    expect(deleteEntry.title).to.equal('Eliminar');
  }));

});