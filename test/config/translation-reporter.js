'use strict';

var fs = require('fs').default;
var path = require('path').default;

var unique = require('lodash/uniq').default;
var sortBy = require('lodash/sortBy').default;

function TranslationReporter() {
  process.env.TRANSLATIONS = 'enabled';

  var outputFile = path.join(__dirname, '../../docs/translations.json');

  var translations = [];


  this.onBrowserLog = function(browser, log, type) {

    if ( log === undefined || typeof log !== 'string' ) {
      return;
    }

    if ( log.substring( 0, 1 ) === '\'' ) {
      log = log.substring( 1, log.length - 1 );
    }

    try {
      var obj = JSON.parse(log);

      if (obj.type === 'translations') {
        translations.push(obj.msg);
      }
    } catch (e) {
      return;
    }
  };


  this.onRunComplete = function() {
    translations = unique(translations);
    translations = sortBy(translations);

    fs.writeFileSync(outputFile, JSON.stringify(translations, null, 2));
  };
}

module.exports = {
  'reporter:translation-reporter' : [ 'type', TranslationReporter ]
};