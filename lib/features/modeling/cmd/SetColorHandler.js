'use strict';

import assign from 'lodash-es/assign';
import forEach from 'lodash-es/forEach';

export default class SetColorHandler {
  constructor(commandStack) {
    this._commandStack = commandStack;
  }

  postExecute(context) {
    var elements = context.elements,
        colors = context.colors || { fill: undefined, stroke: undefined };

    var that = this;

    var di = {};

    if ('fill' in colors) {
      assign(di, { fill: colors.fill });
    }

    if ('stroke' in colors) {
      assign(di, { stroke: colors.stroke });
    }

    forEach(elements, function(element) {
      that._commandStack.execute('element.updateProperties', {
        element: element,
        properties: {
          di: di
        }
      });
    });

  }

  execute(context) {}
  revert(context) {}
}

SetColorHandler.$inject = [ 'commandStack' ];
