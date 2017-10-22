'use strict';

import Viewer from './Viewer';


/**
 * A viewer that includes mouse navigation facilities
 *
 * @param {Object} options
 */
export default class NavigatedViewer extends Viewer { }

NavigatedViewer.prototype._navigationModules = [
  require('diagram-js/lib/navigation/zoomscroll').default,
  require('diagram-js/lib/navigation/movecanvas').default
];

NavigatedViewer.prototype._modules = [].concat(
  Viewer.prototype._modules,
  NavigatedViewer.prototype._navigationModules);