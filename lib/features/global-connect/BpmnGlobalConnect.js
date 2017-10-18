'use strict';

import { isAny } from '../modeling/util/ModelingUtil';

/**
 * Extention of GlobalConnect tool that implements BPMN specific rules about
 * connection start elements.
 */
export default function BpmnGlobalConnect(globalConnect) {
  globalConnect.registerProvider(this);
}

BpmnGlobalConnect.$inject = [ 'globalConnect' ];


/**
 * Checks if given element can be used for starting connection.
 *
 * @param  {Element} source
 * @return {Boolean}
 */
BpmnGlobalConnect.prototype.canStartConnect = function(source) {

  if (nonExistantOrLabel(source)) {
    return null;
  }

  var businessObject = source.businessObject;

  return isAny(businessObject, [
    'bpmn:FlowNode',
    'bpmn:InteractionNode',
    'bpmn:DataObjectReference',
    'bpmn:DataStoreReference'
  ]);
};


function nonExistantOrLabel(element) {
  return !element || isLabel(element);
}

function isLabel(element) {
  return element.labelTarget;
}


