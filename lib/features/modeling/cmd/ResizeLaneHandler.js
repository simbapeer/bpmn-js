'use strict';

import { is } from '../../../util/ModelUtil';

import {
  getLanesRoot,
  computeLanesResize
} from '../util/LaneUtil';

import { eachElement } from 'diagram-js/lib/util/Elements';

import { asTRBL } from 'diagram-js/lib/layout/LayoutUtil';

import { substractTRBL } from 'diagram-js/lib/features/resize/ResizeUtil';


/**
 * A handler that resizes a lane.
 *
 * @param {Modeling} modeling
 */
export default class ResizeLaneHandler {
  constructor(modeling, spaceTool) {
    this._modeling = modeling;
    this._spaceTool = spaceTool;
  }

  preExecute(context) {

    var shape = context.shape,
        newBounds = context.newBounds,
        balanced = context.balanced;

    if (balanced !== false) {
      this.resizeBalanced(shape, newBounds);
    } else {
      this.resizeSpace(shape, newBounds);
    }
  }

  /**
   * Resize balanced, adjusting next / previous lane sizes.
   *
   * @param {djs.model.Shape} shape
   * @param {Bounds} newBounds
   */
  resizeBalanced(shape, newBounds) {

    var modeling = this._modeling;

    var resizeNeeded = computeLanesResize(shape, newBounds);

    // resize the lane
    modeling.resizeShape(shape, newBounds);

    // resize other lanes as needed
    resizeNeeded.forEach(function(r) {
      modeling.resizeShape(r.shape, r.newBounds);
    });
  }

  /**
   * Resize, making actual space and moving below / above elements.
   *
   * @param {djs.model.Shape} shape
   * @param {Bounds} newBounds
   */
  resizeSpace(shape, newBounds) {
    var spaceTool = this._spaceTool;

    var shapeTrbl = asTRBL(shape),
        newTrbl = asTRBL(newBounds);

    var trblDiff = substractTRBL(newTrbl, shapeTrbl);

    var lanesRoot = getLanesRoot(shape);

    var allAffected = [],
        allLanes = [];

    eachElement(lanesRoot, function(element) {
      allAffected.push(element);

      if (is(element, 'bpmn:Lane') || is(element, 'bpmn:Participant')) {
        allLanes.push(element);
      }

      return element.children;
    });

    var change,
        spacePos,
        direction,
        offset,
        adjustments;

    if (trblDiff.bottom || trblDiff.top) {

      change = trblDiff.bottom || trblDiff.top;
      spacePos = shape.y + (trblDiff.bottom ? shape.height : 0) + (trblDiff.bottom ? -10 : 10);
      direction = trblDiff.bottom ? 's' : 'n';

      offset = trblDiff.top > 0 || trblDiff.bottom < 0 ? -change : change;

      adjustments = spaceTool.calculateAdjustments(allAffected, 'y', offset, spacePos);

      spaceTool.makeSpace(adjustments.movingShapes, adjustments.resizingShapes, { x: 0, y: change }, direction);
    }


    if (trblDiff.left || trblDiff.right) {

      change = trblDiff.right || trblDiff.left;
      spacePos = shape.x + (trblDiff.right ? shape.width : 0) + (trblDiff.right ? -10 : 100);
      direction = trblDiff.right ? 'e' : 'w';

      offset = trblDiff.left > 0 || trblDiff.right < 0 ? -change : change;

      adjustments = spaceTool.calculateAdjustments(allLanes, 'x', offset, spacePos);

      spaceTool.makeSpace(adjustments.movingShapes, adjustments.resizingShapes, { x: change, y: 0 }, direction);
    }
  }
}

ResizeLaneHandler.$inject = [ 'modeling', 'spaceTool' ];