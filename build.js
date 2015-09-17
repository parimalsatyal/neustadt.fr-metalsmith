var metalsmith        = require('metalsmith');
var markdown          = require('metalsmith-markdown');
var layouts           = require('metalsmith-layouts');
var permalinks        = require('metalsmith-permalinks');
var beautify          = require('metalsmith-beautify');
var collections       = require('metalsmith-collections');
var define            = require('metalsmith-define');
var handlebars        = require('handlebars');
var serve             = require('metalsmith-serve');
var watch             = require('metalsmith-watch');
var dateFormatter     = require('metalsmith-date-formatter');

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
    lists: {
      pattern: 'src/*.md',
    },
    essays: {
      pattern: 'essays/**/*.md',
      sortBy: 'date',
      reverse: true,
      metadata: {
        name: 'Essays',
        description: 'Description'
      }
    },
    reviews: {
      pattern: 'reviews/**/*.md',
      sortBy: 'date',
      reverse: true,
      metadata: {
        name: 'Reviews',
        description: 'Description'
      }
    },
    music: {
      pattern: 'music/**/*.md',
      sortBy: 'date',
      reverse: true,
      metadata: {
        name: 'Reviews',
        description: 'Description'
      }
    }
  }))
  .use(markdown())
  .use(permalinks({
    pattern: ':collection/:title'
  }))
  .use(dateFormatter({
    dates: [
      {
            key: 'date',
            format: 'DD MMM [\']YY'
        }
    ]
}))
  .use(layouts({
    engine: 'handlebars',
    directory: './layout',
    pattern: ["*/*/*html","*/*html","*html"],
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
