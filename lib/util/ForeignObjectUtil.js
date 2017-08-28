var assign = require('lodash/object/assign');

/**
 * Create and return <foreignObject>.
 * 
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height 
 */
function createForeignObject(x, y, width, height) {
  var foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
  
  foreignObject.setAttribute('x', x);
  foreignObject.setAttribute('y', y);
  foreignObject.setAttribute('width', width);
  foreignObject.setAttribute('height', height);
  
  return foreignObject;
}

/**
 * Create and return <group> containing <foreignObject>.
 * This is necessary to a bug in WebKit:
 * https://bugs.webkit.org/show_bug.cgi?id=23113
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} width 
 * @param {Number} height
 */
function createForeignObjectGroup(x, y, width, height) {
  var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  
  group.setAttribute('transform', 'translate(' + x + ', ' + y + ')');
  
  var foreignObject = createForeignObject(0, 0, width, height);
  
  group.appendChild(foreignObject);
  
  return group;
}

/**
 * Render a label that can be edited into a given parent
 * 
 * Examples:
 * 
 * renderLabel(pool, 'Participant Label', {
 *   horizontalPosition: 'center',
 *   verticalPosition: 'top',
 *   orientation: 'left'
 * });
 *
 * renderLabel(subProcess, 'Subprocess Label', {
 *   horizontalPosition: 'center',
 *   verticalPosition: 'top'
 * });
 *
 * renderLabel(task, 'Task Label', {
 *   horizontalPosition: 'center',
 *   verticalPosition: 'center'
 * });
 * 
 * @param {Object} element
 * @param {String} text 
 * @param {Object} options
 */
module.exports.renderLabel = function(element, text, options) {

  /**
   * Transform label.
   */
  function transformLabel() {
    var contentBounds = {
      width: content.offsetWidth,
      height: content.offsetHeight
    };

    var foreignObject = foreignObjectGroup.firstChild;

    var foreignObjectWidth = contentBounds.width,
        foreignObjectHeight = contentBounds.height;

    foreignObject.setAttribute('width', foreignObjectWidth);
    foreignObject.setAttribute('height', foreignObjectHeight);

    var foreignObjectGroupX = 0,
        foreignObjectGroupY = 0,
        foreignObjectGroupRotation = 0;
    
    switch (orientation) {
    case 'top':

      switch (verticalPosition) {
      case 'top':
        break;
      case 'center':
        foreignObjectGroupY = elementBoundingBox.height / 2 - contentBounds.height / 2;
        break;
      case 'bottom':
        // TODO
        break;
      }

      break;
    case 'right':
      // TODO
      break;
    case 'bottom':
      // TODO
      break;
    case 'left':
      foreignObjectGroupY = elementBoundingBox.height;
      foreignObjectGroupRotation = -90;
      break;
    }

    var transform = 'translate(' + 
      foreignObjectGroupX + 
      ', ' + 
      foreignObjectGroupY + 
      ') rotate(' + 
      foreignObjectGroupRotation + 
      ')';

    foreignObjectGroup.setAttribute('transform', transform);
  }

  if (!options) {
    options = {};
  }

  var elementBoundingBox = element.getBBox();

  var foreignObjectGroup = createForeignObjectGroup(0, 0, options.maxWidth || elementBoundingBox.width, 100);
  element.appendChild(foreignObjectGroup);

  var content = document.createElement('div');

  content.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  content.setAttribute('spellcheck', 'false');

  content.classList.add('content');

  content.style.boxSizing = 'border-box';

  if (options.style) {
    assign(content.style, options.style);
  }

  var horizontalPosition = options.horizontalPosition || 'left',
      verticalPosition = options.verticalPosition || 'top',
      orientation = options.orientation || 'top';

  content.style.textAlign = horizontalPosition;

  var lines = (text && text.split('\n')) || [];

  var html = '';

  lines.forEach(function(line, index) {
    if (index > 0) {
      html = html.concat('<br>');
    }

    html = html.concat(line);
  });

  content.innerHTML = html;

  if (orientation === 'top' || orientation === 'bottom') {
    content.style.width = (options.width || elementBoundingBox.width) + 'px';
  } else {
    content.style.width = (options.width || elementBoundingBox.height) + 'px';
  }

  content.style.height = 'auto';

  var isEmtpyText = text === '';

  if (isEmtpyText) {
    content.innerHTML = 'TEXT';
  }

  // temporarily append to body
  document.body.appendChild(content);

  transformLabel();

  document.body.removeChild(content);
  foreignObjectGroup.firstChild.appendChild(content);

  if (isEmtpyText) {
    content.innerHTML = '';
  }
  
  return foreignObjectGroup;
};

/**
 * Get boundaries of label.
 * 
 * @param {Object} element
 * @param {String} text 
 * @param {Object} options
 */
module.exports.getLayoutedBounds = function(element, text, options) {
  if (!options) {
    options = {};
  }

  var content = document.createElement('div');

  content.style.width = options.width + 'px';

  content.style.boxSizing = 'border-box';

  if (options.style) {
    assign(content.style, options.style);
  }

  if (options.style && options.style.horizontalPosition) {
    content.style.textAlign = options.style.horizontalPosition;
  }

  var lines = (text && text.split('\n')) || [];

  var html = '';

  lines.forEach(function(line, index) {
    if (index > 0) {
      html = html.concat('<br>');
    }

    html = html.concat(line);
  });

  content.innerHTML = html;

  document.body.appendChild(content);

  var contentBounds = {
    x: element.x + element.width / 2 - content.offsetWidth / 2,
    y: element.y,
    width: content.offsetWidth,
    height: content.offsetHeight
  };

  document.body.removeChild(content);

  return contentBounds;
};