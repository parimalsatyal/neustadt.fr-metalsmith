'use strict'

const redirect = require('..')
const test = require('ava')

test.cb('metalsmith-redirect should default to no redirections', (t) => {
  t.plan(1)
  const plugin = redirect()
  const files = {}
  plugin(files, null, () => {
    t.deepEqual(Object.keys(files).length, 0)
    t.end()
  })
})

test.cb('metalsmith-redirect should use the redirections passed as the options', (t) => {
  t.plan(1)
  const plugin = redirect({ 'a': 'b' })
  const files = {}
  plugin(files, null, () => {
    t.deepEqual(files['a/index.html'].contents.toString(), `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex">
    <meta http-equiv="refresh" content="0;url=/a/b">
    <link rel="canonical" href="/a/b">
    <script>window.location.replace('/a/b');</script>
  </head>
  <body>This page has been moved to <a href="/a/b">/a/b</a></body>
</html>
`)
    t.end()
  })
})
