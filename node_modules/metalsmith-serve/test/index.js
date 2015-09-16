
var assert = require('assert');
var http = require('http');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp').sync;
var Metalsmith = require('metalsmith');
var serve = require('..');

var port = 8081;

describe('metalsmith-serve', function() {

  var metalsmith;
  var servePlugin;

  before(function(done) {
    metalsmith = Metalsmith("test/fixtures/site");

    servePlugin = serve({
      verbose: false,
      "port": port,
      listDirectories: true
    });

    metalsmith
      .use(servePlugin)
      .build(function(err) {
        if (err) throw err;

        //create empty directory for testing, as metalsmith doesn't preserve empty directories
        mkdirp(path.join(metalsmith.destination(), "emptydir"));
        done();
      });

  });

  after(function(done) {
    servePlugin.shutdown(done);
  });

  it('should serve on local port', function(done){

    var req = http.request(
      { host: "localhost", "port": port, path: "/" },
      function(res) {
        var body = '';

        res.on('data', function(buf) {
          body += buf;
        });

        res.on('end', function() {
          assert.equal(res.statusCode, 200);
          var contents = fs.readFileSync(path.join(metalsmith.destination(), "index.html"), "utf8");
          assert.equal(body, contents);
        });

        res.on('error', function(e) {
          throw(e);
        });

        done();

      }
    ).end();

  });

  it('should return 404 for non-existent file', function(done){
    var req = http.request(
      { host: "localhost", "port": port, path: "/lostfile.txt" },
      function(res) {
        var body = '';

        res.on('data', function(buf) {
          body += buf;
        });

        res.on('end', function() {
          assert.equal(res.statusCode, 404);
        });

        res.on('error', function(e) {
          throw(e);
        });

        done();

      }
    ).end();

  });

  it('should return 404 for non-existent file in subdirectory', function(done){
    var req = http.request(
      { host: "localhost", "port": port, path: "/dir/lostfile.txt" },
      function(res) {
        var body = '';

        res.on('data', function(buf) {
          body += buf;
        });

        res.on('end', function() {
          assert.equal(res.statusCode, 404);
        });

        res.on('error', function(e) {
          throw(e);
        });

        done();

      }
    ).end();

  });

});


describe('metalsmith-serve with custom indexFile', function(){

  var metalsmith;
  var servePlugin;

  before(function(done) {
    metalsmith = Metalsmith("test/fixtures/customindex");

    servePlugin = serve({
      verbose: false,
      "port": port,
      indexFile: "index.txt"
    });

    metalsmith
      .use(servePlugin)
      .build(function(err) {
        if (err) throw err;
        done();
      });
  });

  after(function(done) {
    servePlugin.shutdown(done);
  });

  it('should serve custom index file', function(done){

    var callback = function(res) {
      var body = '';

      res.on('data', function(buf) {
        body += buf;
      });

      res.on('end', function() {
        assert.equal(res.statusCode, 200);
        var contents = fs.readFileSync(path.join(metalsmith.destination(), "index.txt"), "utf8");
        assert.equal(body, contents);
      });

      res.on('error', function(e) {
        throw(e);
      });

      done();

    };

    var options = {
      host: "localhost",
      "port": port,
      path: "/"
    };

    var req = http.request(options, callback)
    req.end();


  });

});


// not_found file serving and redirects
describe('metalsmith-serve custom http errors and redirects', function() {

  var metalsmith;
  var servePlugin;

  before(function(done) {
    metalsmith = Metalsmith('test/fixtures/site');

    servePlugin = serve({
      verbose: false,
      "port": port,
      "http_error_files": {
        404: "/404.html"
      },
      "redirects": {
        "/redirect_file.txt": "/index.html",
        "/redirect_file.txt?alt=true": "/index.html"
      }
    });

    metalsmith
      .use(servePlugin)
      .build(function(err) {
        if (err) throw err;
        done();
      });

  });

  after(function(done) {
    servePlugin.shutdown(done);
  });

  it('should serve on local port', function(done){

    var req = http.request(
      { host: "localhost", "port": port, path: "/" },
      function(res) {
        var body = '';

        res.on('data', function(buf) {
          body += buf;
        });

        res.on('end', function() {
          assert.equal(res.statusCode, 200);
          var contents = fs.readFileSync(path.join(metalsmith.destination(), "index.html"), "utf8");
          assert.equal(body, contents);
        });

        res.on('error', function(e) {
          throw(e);
        });

        done();

      }
    ).end();

  });

  it('should return 404 and not_found file for non-existent file', function(done){
    var req = http.request(
      { host: "localhost", "port": port, path: "/lostfile.txt" },
      function(res) {
        var body = '';

        res.on('data', function(buf) {
          body += buf;
        });

        res.on('end', function() {
          assert.equal(res.statusCode, 404);
          var contents = fs.readFileSync(path.join(metalsmith.destination(), "404.html"), "utf8");
          assert.equal(body, contents);
        });

        res.on('error', function(e) {
          throw(e);
        });

        done();

      }
    ).end();

  });

  it('should return 301 for configured redirections', function(done){
    var req = http.request(
      { host: "localhost", "port": port, path: "/redirect_file.txt" },
      function(res) {
        var body = '';

        res.on('data', function(buf) {
          body += buf;
        });

        res.on('end', function() {
          assert.equal(res.statusCode, 301);
          assert.equal(res.headers.location, "/index.html")
        });

        res.on('error', function(e) {
          throw(e);
        });

        done();

      }
    ).end();

  });

  it('should return 301 for configured redirections with params', function(done){
    var req = http.request(
      { host: "localhost", "port": port, path: "/redirect_file.txt?alt=true" },
      function(res) {
        var body = '';

        res.on('data', function(buf) {
          body += buf;
        });

        res.on('end', function() {
          assert.equal(res.statusCode, 301);
          assert.equal(res.headers.location, "/index.html")
        });

        res.on('error', function(e) {
          throw(e);
        });

        done();

      }
    ).end();

  });

  it('should return 404 for unmatched redirection with params', function(done){
    var req = http.request(
      { host: "localhost", "port": port, path: "/redirect_file.txt?alt=false" },
      function(res) {
        var body = '';

        res.on('data', function(buf) {
          body += buf;
        });

        res.on('end', function() {
          assert.equal(res.statusCode, 404);
          var contents = fs.readFileSync(path.join(metalsmith.destination(), "404.html"), "utf8");
          assert.equal(body, contents);
        });

        res.on('error', function(e) {
          throw(e);
        });

        done();

      }
    ).end();

  });

});
