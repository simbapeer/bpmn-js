'use strict';

import BaseModeling from 'diagram-js/lib/features/modeling/Modeling';

import UpdatePropertiesHandler from './cmd/UpdatePropertiesHandler';
import UpdateCanvasRootHandler from './cmd/UpdateCanvasRootHandler';
import AddLaneHandler from './cmd/AddLaneHandler';
import SplitLaneHandler from './cmd/SplitLaneHandler';
import ResizeLaneHandler from './cmd/ResizeLaneHandler';
import UpdateFlowNodeRefsHandler from './cmd/UpdateFlowNodeRefsHandler';
import IdClaimHandler from './cmd/IdClaimHandler';
import SetColorHandler from './cmd/SetColorHandler';


/**
 * BPMN 2.0 modeling features activator
 *
 * @param {EventBus} eventBus
 * @param {ElementFactory} elementFactory
 * @param {CommandStack} commandStack
 * @param {BpmnRules} bpmnRules
 */
export default class Modeling extends BaseModeling {

  constructor(eventBus, elementFactory, commandStack, bpmnRules) {

    super(eventBus, elementFactory, commandStack);

    this._bpmnRules = bpmnRules;
  }

  getHandlers() {
    var handlers = BaseModeling.prototype.getHandlers.call(this);

    handlers['element.updateProperties'] = UpdatePropertiesHandler;
    handlers['canvas.updateRoot'] = UpdateCanvasRootHandler;
    handlers['lane.add'] = AddLaneHandler;
    handlers['lane.resize'] = ResizeLaneHandler;
    handlers['lane.split'] = SplitLaneHandler;
    handlers['lane.updateRefs'] = UpdateFlowNodeRefsHandler;
    handlers['id.updateClaim'] = IdClaimHandler;
    handlers['element.setColor'] = SetColorHandler;

    return handlers;
  }

  updateLabel(element, newLabel) {
    this._commandStack.execute('element.updateLabel', {
      element: element,
      newLabel: newLabel
    });
  }

  connect(source, target, attrs, hints) {

    var bpmnRules = this._bpmnRules;

    if (!attrs) {
      attrs = bpmnRules.canConnect(source, target);
    }

    if (!attrs) {
      return;
    }

    return this.createConnection(source, target, attrs, source.parent, hints);
  }

  updateProperties(element, properties) {
    this._commandStack.execute('element.updateProperties', {
      element: element,
      properties: properties
    });
  }

  resizeLane(laneShape, newBounds, balanced) {
    this._commandStack.execute('lane.resize', {
      shape: laneShape,
      newBounds: newBounds,
      balanced: balanced
    });
  }

  addLane(targetLaneShape, location) {
    var context = {
      shape: targetLaneShape,
      location: location
    };

    this._commandStack.execute('lane.add', context);

    return context.newLane;
  }

  splitLane(targetLane, count) {
    this._commandStack.execute('lane.split', {
      shape: targetLane,
      count: count
    });
  }

  /**
   * Transform the current diagram into a collaboration.
   *
   * @return {djs.model.Root} the new root element
   */
  makeCollaboration() {

    var collaborationElement = this._create('root', {
      type: 'bpmn:Collaboration'
    });

    var context = {
      newRoot: collaborationElement
    };

    this._commandStack.execute('canvas.updateRoot', context);

    return collaborationElement;
  }

  updateLaneRefs(flowNodeShapes, laneShapes) {

    this._commandStack.execute('lane.updateRefs', {
      flowNodeShapes: flowNodeShapes,
      laneShapes: laneShapes
    });
  }

  /**
   * Transform the current diagram into a process.
   *
   * @return {djs.model.Root} the new root element
   */
  makeProcess() {

    var processElement = this._create('root', {
      type: 'bpmn:Process'
    });

    var context = {
      newRoot: processElement
    };

    this._commandStack.execute('canvas.updateRoot', context);
  }

  claimId(id, moddleElement) {
    this._commandStack.execute('id.updateClaim', {
      id: id,
      element: moddleElement,
      claiming: true
    });
  }

  unclaimId(id, moddleElement) {
    this._commandStack.execute('id.updateClaim', {
      id: id,
      element: moddleElement
    });
  }

  setColor(elements, colors) {
    if (!elements.length) {
      elements = [ elements ];
    }

    this._commandStack.execute('element.setColor', {
      elements: elements,
      colors: colors
    });
  }
}

Modeling.$inject = [ 'eventBus', 'elementFactory', 'commandStack', 'bpmnRules' ];
