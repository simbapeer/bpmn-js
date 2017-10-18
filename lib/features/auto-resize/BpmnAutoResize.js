'use strict';

import AutoResize from 'diagram-js/lib/features/auto-resize/AutoResize';

import { is } from '../../util/ModelUtil';

/**
 * Sub class of the AutoResize module which implements a BPMN
 * specific resize function.
 */
export default class BpmnAutoResize extends AutoResize {

  /**
   * Resize shapes and lanes
   *
   * @param  {djs.model.Shape} target
   * @param  {Object} newBounds
   */
  resize(target, newBounds) {

    if (is(target, 'bpmn:Participant')) {
      this._modeling.resizeLane(target, newBounds);
    } else {
      this._modeling.resizeShape(target, newBounds);
    }
  }

}

BpmnAutoResize.$inject = [ 'eventBus', 'elementRegistry', 'modeling', 'rules' ];
