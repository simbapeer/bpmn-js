'use strict';

import forEach from 'lodash-es/forEach';

import inherits from 'inherits';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

export default function UnclaimIdBehavior(eventBus, modeling) {

  CommandInterceptor.call(this, eventBus);

  this.preExecute('elements.delete', function(event) {
    var context = event.context,
        elements = context.elements;

    forEach(elements, function(element) {
      modeling.unclaimId(element.businessObject.id, element.businessObject);
    });

  });
}

inherits(UnclaimIdBehavior, CommandInterceptor);

UnclaimIdBehavior.$inject = [ 'eventBus', 'modeling' ];
