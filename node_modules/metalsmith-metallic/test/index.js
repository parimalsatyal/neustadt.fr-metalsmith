/* jshint mocha: true */
var assert = require('assert');
var metallic = require('..');
var Metalsmith = require('metalsmith');
var fs = require('fs');


describe('metalsmith-metallic', function(){
  it('should highlight code blocks in markdown files', function(done){
    fs.readFile('test/fixture/expected/index.md', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      Metalsmith('test/fixture')
        .use(metallic())
        .build(function(err, files){
          if (err) { return done(err); }
          assert.equal(data.toString(), files['index.md'].contents);
          done();
        });
    });
  });
    
  it('should parse code blocks with the no-highlight language in markdown files', function(done){
    fs.readFile('test/fixture/expected/nohighlight.md', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      Metalsmith('test/fixture')
        .use(metallic())
        .build(function(err, files){
          if (err) { return done(err); }
          assert.equal(data.toString(), files['nohighlight.md'].contents);
          done();
        });
    });
  });
    
  it('should highlight specific languages as it does in the browser', function(done){
    fs.readFile('test/fixture/expected/csharp.md', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      Metalsmith('test/fixture')
        .use(metallic())
        .build(function(err, files){
          if (err) { return done(err); }
          assert.equal(data.toString(), files['csharp.md'].contents);
          done();
        });
    });
  });    
});