var Metalsmith = require('metalsmith');

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .build()
