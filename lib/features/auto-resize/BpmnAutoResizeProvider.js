'use strict';

import { is } from '../../util/ModelUtil';

import forEach from 'lodash-es/forEach';

import AutoResizeProvider from 'diagram-js/lib/features/auto-resize/AutoResizeProvider';

/**
 * This module is a provider for automatically resizing parent BPMN elements
 */
export default class BpmnAutoResizeProvider extends AutoResizeProvider {

  constructor(eventBus, modeling) {

    super(eventBus);

    this._modeling = modeling;
  }

  /**
   * Check if the given target can be expanded
   *
   * @param  {djs.model.Shape} target
   *
   * @return {boolean}
   */
  canResize(elements, target) {

    if (!is(target, 'bpmn:Participant') && !is(target, 'bpmn:Lane') && !(is(target, 'bpmn:SubProcess'))) {
      return false;
    }

    var canResize = true;

    forEach(elements, function(element) {

      if (is(element, 'bpmn:Lane') || element.labelTarget) {
        canResize = false;
        return;
      }
    });

    return canResize;
  }
}

BpmnAutoResizeProvider.$inject = [ 'eventBus', 'modeling' ];
