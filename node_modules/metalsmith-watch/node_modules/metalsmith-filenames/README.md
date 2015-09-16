# metalsmith-filenames [![Travis Build Status](https://travis-ci.org/MoOx/metalsmith-filenames.svg)](https://travis-ci.org/MoOx/metalsmith-filenames)

> Metalsmith plugin to add filenames to entries

## Installation

```console
$ npm install metalsmith-filenames
```

## Usage

```js
import Metalsmith from "metalsmith"
import filenames from "metalsmith-filenames"

new Metalsmith("./")
  .use(
    filenames()
  )
  .build(err => {if (err) {throw err}})
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
