'use strict';

var LabelUtil = require('../LabelUtil');

var getLayoutedBounds = require('../../../util/ForeignObjectUtil').getLayoutedBounds;

var hasExternalLabel = require('../../../util/LabelUtil').hasExternalLabel;

var getBusinessObject = require('../../../util/ModelUtil').getBusinessObject,
    is = require('../../../util/ModelUtil').is;

var NULL_DIMENSIONS = {
  width: 0,
  height: 0
};

var EXTERNAL_LABEL_WIDTH = 90;

/**
 * A handler that updates the text of a BPMN element.
 */
function UpdateLabelHandler(modeling) {

  /**
   * Set the label and return the changed elements.
   *
   * Element parameter can be label itself or connection (i.e. sequence flow).
   *
   * @param {djs.model.Base} element
   * @param {String} text
   */
  function setText(element, text) {

    // external label if present
    var label = element.label || element;

    var labelTarget = element.labelTarget || element;

    LabelUtil.setLabel(label, text, labelTarget !== label);

    return [ label, labelTarget ];
  }

  function execute(ctx) {
    ctx.oldLabel = LabelUtil.getLabel(ctx.element);
    return setText(ctx.element, ctx.newLabel);
  }

  function revert(ctx) {
    return setText(ctx.element, ctx.oldLabel);
  }

  function postExecute(ctx) {
    var element = ctx.element,
        label = element.label || element,
        bounds = ctx.bounds;

    // ignore internal labels for elements except text annotations
    if (!hasExternalLabel(element) && !is(element, 'bpmn:TextAnnotation')) {
      return;
    }

    var bo = getBusinessObject(label);

    var text = bo.name || bo.text;

    if (!text) {
      return;
    }

    var newBounds = is(element, 'bpmn:TextAnnotation') ? bounds : getLayoutedBounds(label, text, {
      width: EXTERNAL_LABEL_WIDTH
    });

    modeling.resizeShape(label, newBounds, NULL_DIMENSIONS);
  }

  // API

  this.execute = execute;
  this.revert = revert;
  this.postExecute = postExecute;
}

UpdateLabelHandler.$inject = [ 'modeling' ];

module.exports = UpdateLabelHandler;