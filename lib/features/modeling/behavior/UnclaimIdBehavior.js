'use strict';

import forEach from 'lodash-es/forEach';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';


export default class UnclaimIdBehavior extends CommandInterceptor {

  constructor(eventBus, modeling) {

    super(eventBus);

    this.preExecute('elements.delete', function(event) {
      var context = event.context,
          elements = context.elements;

      forEach(elements, function(element) {
        modeling.unclaimId(element.businessObject.id, element.businessObject);
      });

    });
  }

}

UnclaimIdBehavior.$inject = [ 'eventBus', 'modeling' ];
