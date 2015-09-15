var metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var beautify    = require('metalsmith-beautify');
var collections = require('metalsmith-collections');
var define      = require('metalsmith-define');
var handlebars  = require('handlebars');

metalsmith(__dirname)
  .metadata({
    site: {
      sitetitle: 'Neustadt.fr',
      siteurl: 'https://neustadt.fr',
      author: 'Parimal Satyal'
    }
  })
  .source('src')
  .destination('public')
  .use(collections({
    essays: {
      pattern: 'essays/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    
    directory: 'layout',
    default: 'essay.html',
    partials: {
            header: 'partials/header',
            footer: 'partials/footer'
        }
  }))
  .use(permalinks())
  .use(beautify({
    "preserve_newlines": true,
  }))
  .build(function (err) {
      if (err) {
        throw err;
      }
  });
