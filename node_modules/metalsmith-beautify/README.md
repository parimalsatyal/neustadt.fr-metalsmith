# metalsmith-beautify

  A [Metalsmith](http://www.metalsmith.io/) plugin to format html / js.

## Installation

    $ npm install metalsmith-beautify

## CLI Usage

  Install via npm and then add the `metalsmith-beautify` key to your `metalsmith.json` plugins with any [js-beautify](https://github.com/einars/js-beautify) options you want, like so:

```json
{
  "plugins": {
    "metalsmith-beautify": {
    }
  }
}
```

## Javascript Usage

  Pass `options` to the beautify plugin and pass it to Metalsmith with the `use` method:

```js
var beautify = require('metalsmith-beautify');

metalsmith.use(beautify({
}));
```

## License

  MIT

## Credit

The credit for the heavy lifting here goes to the [js-beautify](https://github.com/einars/js-beautify) tool.
