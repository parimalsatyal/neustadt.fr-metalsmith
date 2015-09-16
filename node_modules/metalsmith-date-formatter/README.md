# Metalsmith Date Formatter

[![Build Status](https://travis-ci.org/hellatan/metalsmith-date-formatter.svg?branch=master)](https://travis-ci.org/hellatan/metalsmith-date-formatter)

Format article/post dates based on [YAML Front Matter (YFM)](http://jekyllrb.com/docs/frontmatter/) data and [moment](http://momentjs.com/)

 ## Installation
 
 ```bash
 npm install --save-dev metalsmith-date-formatter
 ```

## Usage

Front Matter:
```markdown
---
publishDate: 2015-05-30
modifedDate: 2015-05-31
---
```

JavaScript API:

```js
var Metalsmith = require('metalsmith');
var dateFormatter = require('metalsmith-date-formatter');

Metalsmith()
    .use(dateFormatter());
```

In your template::
```html
<p>published: {{ publishDate }}</p>
<p>last modified: {{ modifiedDate }}</p>
```

## options

### dates

This option takes multiple formats

array of objects with `key` and `format` properties. 

- The `key` property is the YFM property name
- The `format` property is optional but takes any moment format value

```js
.use(dateFormatter({
    dates: [
        {
            key: 'publishDate',
            format: 'MM DD YYYY'
        },
        {
            key: 'modifiedDate',
            format: 'MM YYYY'
        }
    ]
})
```

array of strings

```js
.use(dateFormatter({
    dates: ['publishDate', 'modifiedDate']
})
```

string

```js
.use(dateFormatter({
    dates: 'publishDate'
})
```

### format

Any date format that `moment` accepts, defaults to `MMMM DD, YYYY`

## Notes
 
The metalsmith cli workflow has not been tested

