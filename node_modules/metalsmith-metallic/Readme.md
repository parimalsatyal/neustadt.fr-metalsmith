
# metalsmith-metallic <img src="https://travis-ci.org/weswigham/metalsmith-metallic.svg">

  A [Metalsmith](http://metalsmith.io) plugin to highlight code in Markdown files.

## Installation

    $ npm install metalsmith-metallic
    
## Setup

Include a [highlight.js](http://highlightjs.org/download/) theme somewhere in your templates.

Ex:
```html
<link rel="stylesheet" href="http://yandex.st/highlightjs/8.0/styles/default.min.css">
```

## CLI Usage

  Install via npm and then add the `metalsmith-metallic` key to your `metalsmith.json` plugin, like so:

```json
{
  "plugins": {
    "metalsmith-metallic": true
  } 
}
```

## Javascript Usage

```js
var metallic = require('metalsmith-metallic');

metalsmith.use(metallic());
```

## License

  MIT