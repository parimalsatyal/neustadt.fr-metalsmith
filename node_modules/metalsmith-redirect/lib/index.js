'use strict'

const normalize = require('./normalize')
const path = require('path')

/**
 * A Metalsmith plugin to create HTTP redirections.
 * @param {Object} options - the source/destination couples to redirect from/to
 * @return {Function} - the Metalsmith plugin
 */
module.exports = (options) =>
  (files, metalsmith, done) =>
    Object.keys(options || {}).forEach((source) => {
      const destination = options[source]

      // Normalize the source and the destination
      const normalizedSource = normalize(source)
        .appendHTMLIndexIfNeeded()
        .ensureHTML()
        .relativeTo('/')
        .get()
      const normalizedDestination = normalize(destination)
        .relativeTo(path.dirname(normalizedSource))
        .get()

      // Render the view
      const contents = new Buffer(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex">
    <meta http-equiv="refresh" content="0;url=${normalizedDestination}">
    <link rel="canonical" href="${normalizedDestination}">
    <script>window.location.replace('${normalizedDestination}');</script>
  </head>
  <body>This page has been moved to <a href="${normalizedDestination}">${normalizedDestination}</a></body>
</html>
`)

      // Compute the filepath
      const filepath = normalizedSource.substr(1)

      // Add the view to the output files
      files[filepath] = { contents }
    }) || done()
