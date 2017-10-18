'use strict';

import map from 'lodash-es/map';
import assign from 'lodash-es/assign';
import pick from 'lodash-es/pick';


export default class BpmnFactory {
  constructor(moddle) {
    this._model = moddle;
  }

  _needsId(element) {
    return element.$instanceOf('bpmn:RootElement') ||
           element.$instanceOf('bpmn:FlowElement') ||
           element.$instanceOf('bpmn:MessageFlow') ||
           element.$instanceOf('bpmn:DataAssociation') ||
           element.$instanceOf('bpmn:Artifact') ||
           element.$instanceOf('bpmn:Participant') ||
           element.$instanceOf('bpmn:Lane') ||
           element.$instanceOf('bpmn:Process') ||
           element.$instanceOf('bpmn:Collaboration') ||
           element.$instanceOf('bpmndi:BPMNShape') ||
           element.$instanceOf('bpmndi:BPMNEdge') ||
           element.$instanceOf('bpmndi:BPMNDiagram') ||
           element.$instanceOf('bpmndi:BPMNPlane') ||
           element.$instanceOf('bpmn:Property');
  }

  _ensureId(element) {

    // generate semantic ids for elements
    // bpmn:SequenceFlow -> SequenceFlow_ID
    var prefix = (element.$type || '').replace(/^[^:]*:/g, '') + '_';

    if (!element.id && this._needsId(element)) {
      element.id = this._model.ids.nextPrefixed(prefix, element);
    }
  }

  create(type, attrs) {
    var element = this._model.create(type, attrs || {});

    this._ensureId(element);

    return element;
  }

  createDiLabel() {
    return this.create('bpmndi:BPMNLabel', {
      bounds: this.createDiBounds()
    });
  }

  createDiShape(semantic, bounds, attrs) {

    return this.create('bpmndi:BPMNShape', assign({
      bpmnElement: semantic,
      bounds: this.createDiBounds(bounds)
    }, attrs));
  }

  createDiBounds(bounds) {
    return this.create('dc:Bounds', bounds);
  }

  createDiWaypoints(waypoints) {
    return map(waypoints, function(pos) {
      return this.createDiWaypoint(pos);
    }, this);
  }

  createDiWaypoint(point) {
    return this.create('dc:Point', pick(point, [ 'x', 'y' ]));
  }

  createDiEdge(semantic, waypoints, attrs) {
    return this.create('bpmndi:BPMNEdge', assign({
      bpmnElement: semantic
    }, attrs));
  }

  createDiPlane(semantic) {
    return this.create('bpmndi:BPMNPlane', {
      bpmnElement: semantic
    });
  }
}

BpmnFactory.$inject = [ 'moddle' ];
