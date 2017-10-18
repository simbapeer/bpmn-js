import AutoResize from 'diagram-js/lib/features/auto-resize/AutoResize';

import inherits from 'inherits';

import { is } from '../../util/ModelUtil';

/**
 * Sub class of the AutoResize module which implements a BPMN
 * specific resize function.
 */
function BpmnAutoResize(eventBus, elementRegistry, modeling, rules) {
  AutoResize.call(this, eventBus, elementRegistry, modeling, rules);
}

BpmnAutoResize.$inject = [ 'eventBus', 'elementRegistry', 'modeling', 'rules' ];

inherits(BpmnAutoResize, AutoResize);


/**
 * Resize shapes and lanes
 *
 * @param  {djs.model.Shape} target
 * @param  {Object} newBounds
 */
BpmnAutoResize.prototype.resize = function(target, newBounds) {

  if (is(target, 'bpmn:Participant')) {
    this._modeling.resizeLane(target, newBounds);
  } else {
    this._modeling.resizeShape(target, newBounds);
  }
};