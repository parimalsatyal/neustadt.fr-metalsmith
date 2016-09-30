'use strict'

var path = require('path')

/**
 * Wrap a path and return an object which exposes methods in order to manipulate
 * it.
 * @param {String} wrappedPath The path to normalize
 */
module.exports = function (wrappedPath) {
  return {
    /**
     * Return the wrapped path.
     * @return {String} The wrapped path
     */
    get: function () {
      // Handle Windows style path
      wrappedPath = wrappedPath.replace(/\\/g, '/')

      return wrappedPath
    },

    /**
     * Append a HTML index (index.html) to the wrapped path if it is a
     * directory.
     */
    appendHTMLIndexIfNeeded: function () {
      if (isDirectory(wrappedPath)) {
        // Save the prefix (http:/, ftp:/, ...) in order to avoid issues with
        // path.join()
        var prefix = ''
        var idx = wrappedPath.indexOf('/')
        if (idx > 0) {
          prefix = wrappedPath.substring(0, idx + 1)
          wrappedPath = wrappedPath.substring(idx + 1)
        }

        wrappedPath = prefix + path.join(wrappedPath, 'index.html')
      }
      return this
    },

    /**
     * Ensure that the wrapped path ends with a HTML file.
     * @throws Will throw an exception if the wrapped path doesn't end with a
     * HTML file
     */
    ensureHTML: function () {
      if (!isHTML(wrappedPath)) {
        throw new Error('"' + wrappedPath + '" is not a valid HTML path')
      }
      return this
    },

    /**
     * Make the wrapped path relative to the given directory.
     * @param {String} dir If not given, will consider relative to the root
     * directory
     */
    relativeTo: function (dir) {
      // Just return as is if the wrapped path is absolute
      if (isAbsolute(wrappedPath)) {
        return this
      }

      wrappedPath = path.join(dir, wrappedPath)

      return this
    }
  }
}

/**
 * Return true if a string represents a directory. The results is determined
 * based on the absence of extension.
 * @param {String} toTest
 * @return {Boolean} true if a directory, false otherwise
 */
function isDirectory (toTest) {
  return path.extname(toTest) === ''
}

/**
 * Return true if a string represents a path to a HTML file. The results is
 * determined based on the '.html' extension.
 * @param {String} toTest
 * @return {Boolean} true if a HTML file, false otherwise
 */
function isHTML (toTest) {
  return path.extname(toTest) === '.html'
}

/**
 * Return true if a string represents is absolute (either as a path or as a
 * URL).
 * @param {String} toTest
 * @return {Boolean} true if an absolute path
 */
function isAbsolute (toTest) {
  return /^(?:\/|\\|(?:http|https|ftp):\/\/)/.test(toTest)
}
