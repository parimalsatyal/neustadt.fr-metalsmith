/**
 * A Metalsmith plugin to define values in the metadata.
 *
 * @param {Object} files
 * @param {Metalsmith} metalsmith
 * @param {Function} done
 */
module.exports = function plugin(options) {
  options = options || {};

  return function(files, metalsmith, done) {
    var metadata = metalsmith.metadata();

    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        metadata[key] = options[key];
      }
    }

    return done();
  };
}
