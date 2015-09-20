var metalsmith        = require('metalsmith'),
    markdown          = require('metalsmith-markdown'),
    layouts           = require('metalsmith-layouts'),
    permalinks        = require('metalsmith-permalinks'),
    beautify          = require('metalsmith-beautify'),
    collections       = require('metalsmith-collections'),
    define            = require('metalsmith-define'),
    handlebars        = require('handlebars'),
    serve             = require('metalsmith-serve'),
    watch             = require('metalsmith-watch');

handlebars.registerHelper('moment', require('helper-moment'));

// limit an array to a maximum of elements (from the start)
handlebars.registerHelper('each_upto', function(ary, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Neustadt.fr',
      baseurl: 'https://neustadt.fr',
      author: 'Parimal Satyal',
      description: 'Neustadt.fr is Paris-based designer Parimal Satyal\'s collection of essays, reviews and music.',
      keywords: 'neustadt, parimal satyal, parimalsatyal'
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
    relative: false
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
        console.log(err);
      }
      else {
        console.log('Neustadt.fr built!');
      }
    });
