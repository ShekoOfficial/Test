// credit: https://github.com/jgoralcz/aki-api

// pattern to match to ensure we can have a session.
const patternSession = new RegExp("var uid_ext_session = '(.*)';\\n.*var frontaddr = '(.*)';");
const jQuery = "callback=jQuery331023608747682107778_";

module.exports = {
  patternSession,
  jQuery
};
