var metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var beautify    = require('metalsmith-beautify');
var collections = require('metalsmith-collections');
var define      = require('metalsmith-define');
var handlebars  = require('handlebars');
var serve       = require('metalsmith-serve');
var watch       = require('metalsmith-watch');

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Neustadt.fr',
      baseurl: 'https://neustadt.fr',
      author: 'Parimal Satyal'
    }
  })
  .source('./src')
  .destination('./public')
  .use(collections({
    essays: {
      pattern: 'essays/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(permalinks({
    pattern: ':collection/:title'
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: './layout',
    pattern: ["*/*/*html","*html"],
    default: 'essay.html',
    partials: {
            header: 'partials/header',
            footer: 'partials/footer'
        }
  }))
  .use(beautify({
    preserve_newlines: true,
    css: false,
    js: false
  }))
  .use(serve({
    port: 8081,
    verbose: true
  }))
  .use(watch({
      paths: {
        "${source}/**/*": true,
        "layout/**/*": "**/*",
      }
    }))
  .build(function (err) {
      if (err) {
        throw err;
      }
  });
