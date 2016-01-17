/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var P = require('./promise')
var url = require('url');
var validator = require('./routes/validators');

module.exports = function (log, error, config) {

  function isLocalEmailAddress(email) {
    
    if ( !validator.isValidEmailAddress(email) ) {
      return false;
    }
          
    // Extract username and domain
    var atPos = email.indexOf('@');
    if (atPos === -1 || atPos === 0 || atPos === email.length) {
      return false;
    }
    var username = email.substring(0, atPos)
    var domain   = email.substring(atPos + 1)

    var localDomain = url.parse(config.contentServer.url).hostname;

    return (domain == localDomain);
  }

  return function isAnonymousAccount(email) {
    return P.resolve(isLocalEmailAddress(email));
  }
}
