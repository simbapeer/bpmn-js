'use strict';

export default class IdClaimHandler {
  constructor(moddle) {
    this._moddle = moddle;
  }

  execute(context) {
    var ids = this._moddle.ids,
        id = context.id,
        element = context.element,
        claiming = context.claiming;

    if (claiming) {
      ids.claim(id, element);
    } else {
      ids.unclaim(id);
    }
  }

  /**
   * Command revert implementation.
   */
  revert(context) {
    var ids = this._moddle.ids,
        id = context.id,
        element = context.element,
        claiming = context.claiming;

    if (claiming) {
      ids.unclaim(id);
    } else {
      ids.claim(id, element);
    }
  }
}

IdClaimHandler.$inject = [ 'moddle' ];

