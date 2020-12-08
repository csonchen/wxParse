/*
Language: C++
Category: common, system
Website: https://isocpp.org
*/

import cLike from './c-like.js';

/** @type LanguageFn */
module.exports = function(hljs) {
  const lang = cLike(hljs);
  // return auto-detection back on
  lang.disableAutodetect = false;
  lang.name = 'C++';
  lang.aliases = ['cc', 'c++', 'h++', 'hpp', 'hh', 'hxx', 'cxx'];
  return lang;
}