'use strict';

var web = require('node-static');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var HTTPStatus = require('http-status');

var serve = function(options) {
  var server;

  var f = function(files, metalsmith, done) {

    if (server) {
      done();
      return;
    }

    var docRoot = metalsmith.destination();
    var fileServer = new web.Server(docRoot, { cache: options.cache, indexFile: options.indexFile, headers: options.headers });

    server = require('http').createServer(function (request, response) {
      request.addListener('end', function () {

        fileServer.serve(request, response, function(err, res) {
          if (err) {
            if (options.redirects[request.url]) {
              log(chalk.yellow("[" + HTTPStatus.MOVED_PERMANENTLY + "] " + request.url + " > " + options.redirects[request.url]), true);
              response.writeHead(HTTPStatus.MOVED_PERMANENTLY, {"Location": options.redirects[request.url]});
              response.end(HTTPStatus[HTTPStatus.MOVED_PERMANENTLY]);
            }
            else if (err.status && options.http_error_files && options.http_error_files[err.status]) {
              log(chalk.yellow("[" + err.status + "] " + request.url + " - served: " + options.http_error_files[err.status]), true);
              fileServer.serveFile(options.http_error_files[err.status], err.status, {}, request, response);
            }
            else {
              log(chalk.red("[" + err.status + "] " + request.url), true);

              response.writeHead(err.status, err.headers);
              response.end(HTTPStatus[err.status]);
            }

          } else if (options.verbose) {
            log("[" + response.statusCode + "] " + request.url, true);
          }
        });

      }).resume();

    })

    server.on('error', function (err) {
      if (err.code == 'EADDRINUSE') {
        log(chalk.red("Address " + options.host + ":" + options.port + " already in use"));
        throw err;
      }
    });

    server.listen(options.port, options.host);

    log(chalk.green("serving " + docRoot + " at http://" + options.host + ":" + options.port));
    done();

  }

  f.shutdown = function(done) {
    server.close(function() {
      done();
    });
  }

  return f;
}


function formatNumber(num) {
  return num < 10 ? "0" + num : num;
}

function log(message, timestamp) {
  var tag = chalk.blue("[metalsmith-serve]");
  var date = new Date();
  var tstamp = formatNumber(date.getHours()) + ":" + formatNumber(date.getMinutes()) + ":" + formatNumber(date.getSeconds());
  console.log(tag + (timestamp ? " " + tstamp : "") + " " + message);
}


var defaults = {
  cache: 0,
  port: 8080,
  host: "localhost",
  verbose: false,
  listDirectories: false,
  indexFile: "index.html",
  headers: {},
  redirects: {}
};

var plugin = function (options) {
  Object.keys(defaults).forEach(function(key) {
    if (!options[key]) {
      options[key] = defaults[key];
    }
  });

  return serve(options);
}

module.exports = plugin;
