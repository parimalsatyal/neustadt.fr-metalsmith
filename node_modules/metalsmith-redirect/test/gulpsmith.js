'use strict'

const fs = require('fs')
const gulp = require('gulp')
const gulpsmith = require('gulpsmith')
const path = require('path')
const redirect = require('..')
const rimraf = require('rimraf')
const test = require('ava')

// Define the build path, and make sure it's being cleaned before and after each
// build
const build = path.join(__dirname, 'build')
const cleanBuildHook = (t) => rimraf(build, t.end)
test.cb.before(cleanBuildHook)
test.cb.after(cleanBuildHook)

// https://github.com/aymericbeaumet/metalsmith-redirect/issues/10
test.cb('metalsmith-redirect should be working with gulp and gulpsmith', (t) => {
  t.plan(2)
  gulp.src([])
    .pipe(gulpsmith().use(redirect({ '/foo': '/bar' })))
    .pipe(gulp.dest(build))
    .on('end', () => {
      fs.lstat(build, (error, stats) => {
        t.ifError(error)
        t.true(stats.isDirectory())
        t.end()
      })
    })
})
