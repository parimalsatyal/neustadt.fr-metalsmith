---
title: A Beginner's Guide to Crafting a Blog with Metalsmith
date: 2015-10-06
blurb: Neustadt.fr is built with Metalsmith, a node.js-based static site generator. In this tutorial I explain how you can build your own Metalsmith blog from scratch.
type: tutorial
draft: false
highlighting: true
---

Neustadt.fr started, as many things have, with [a post on Hacker News](https://news.ycombinator.com/item?id=10001996). I stumbled on Jendrik Poloczek's [very simple, readable website](http://www.madewithtea.com/) after one of his articles made it to the front page. His website is apparently *powered by [Pelican](http://blog.getpelican.com/)*, a Python-based static site generator. I didn't really know what that meant but I was intrigued.

This came at a time when I was getting increasingly frustrated with the wastefulness, bloat and disregard for privacy in modern web design. Not to mention the layers and layers of dependencies. People who want a simple website today often end up with a dynamic database-dependent WordPress blog running a theme that has widgets, infinite scroll, lightbox, a media gallery, Google Analytics and jQuery animations built-in. And all they wanted was to post a few photos and articles every month. It's ridiculous.

## Why go static?

Simplicity and speed. Call it nostalgia but I like to keep things small, simple and elegant. There's something beautiful about a website in standard HTML, CSS and Javascript that can be hosted pretty much anywhere. Even [Neocities](https://neocities.org/).

With a static website, you don't have to worry about databases, SQL injections, security patches and server environments. Need to change hosts? Migrating is as simple as copy/paste. Then there's the speed. Between the caching and not having to query databases to dynamically generate pages every time, you end up with something very robust.

## Why Metalsmith?

Before choosing Metalsmith, I looked into Python-based [Pelican](http://blog.getpelican.com/), Ruby-based [Jekyll](https://jekyllrb.com/) and [Middleman](https://middlemanapp.com/), node.js-powered [Wintersmith](https://middlemanapp.com/) and Golang-powered [Hugo](https://gohugo.io/). They are all capable static site generators with active developer and user communities so you'd really be okay with any of them.

What I loved about Metalsmith is that it does nothing out of the box. It just takes a source directory and spits everything out into a destination directory. If you want it to do anything at all, you need to build your own workflow with plugins. And in Metalsmith, *everything* is a plugin.

Instead of having to *disable* features I don't need; I simply *add* the ones I want from a growing [ecosystem of over a 130 plugins](www.metalsmith.io/#the-plugins). Markdown, drafts, permalinks, code highlighting, templates - they're all optional plugins.

## Requirements and audience

This tutorial is for beginners, so it'll be quite detailed and verbose. I assume only that you are familiar with basic HTML/CSS and are at least a little bit comfortable using the command line. You'll also need to be familiar with basic Javascript syntax and [JSON](http://www.json.org/). If you have doubts, don't worry; you can learn as you go.

We'll be writing our posts in [Markdown](https://help.github.com/articles/markdown-basics/), a very simple markup language that lets you format your posts easily and then converts everything to HTML.

You don't need to know [node.js](https://nodejs.org).

To complete this tutorial, you will need:

- A computer running Windows, Mac OS X or almost any UNIX-based OS
- Shell access (like Terminal on Mac)
- A text editor (like [GitHub Atom](https://atom.io/))
- A web browser
- A web host if you want to go live

I usually also use Git for version control. But let's keep things simple for this tutorial.

## Installing Node.js and Metalsmith

If you're running Windows or Mac OS X, the easiest way to install Node.js is to [download the precompiled binaries](https://nodejs.org/en/download/). If you're running Linux, you can use your distro's [package manager](https://nodejs.org/en/download/package-manager/).

This installs both Node.js and [npm](https://nodejs.org/en/download/package-manager/), the node package manager that we'll be using to install all our plugins.

Once you have npm installed, you can go ahead and install metalsmith. Before you do so, let's create a project directory. We'll call our sample site "Electroniq". On the command line, type (omitting the `$` and anything before it of course):

```
$ mkdir electroniq
```

Then `cd` into that directory and make a new folder called `src`.

```
$ cd electroniq
$ mkdir src
```

We'll use this folder to store all our source files: our posts in Markdown (`.md`) and our site assets (`.css`,  `.js` and image files). But first things first, we'll need a package file for all our dependencies (every plugin is a dependency).

On your root folder (`electroniq`), create a file called `package.json` that contains:

```
{
  "name": "electroniq",
  "version": "1.0.0",
  "private": true,
  "description": "Electroniq is a sample metalsmith project.",
  "author": "<your-name>"
}
```

Every time you install a plugin, we'll add it to this file. This can be automated; let's install a plugin to see it in action.

We'll start by installing metalsmith itself:

```
$ npm install metalsmith --save
```

This installs metalsmith and creates a `node_modules` folder with all of metalsmith's dependencies. The `--save` flag automatically also adds metalsmith to your `package.json` file; if you open it now, it'll look something like this:

```
{
  "name": "electroniq",
  "version": "1.0.0",
  "private": true,
  "description": "Electroniq is a sample metalsmith project.",
  "author": "<your-name>",
  "dependencies": {
    "metalsmith": "^2.0.1"
  }  
}
```

We now have *nodejs*, *npm* and *Metalsmith* installed. We also have a project directory, a source directory, a package dependency file and a folder that'll hold all of our node modules.

Now to start forging.

## A basic workflow

First things first, we need a build file to define our metalsmith workflow. Create a file called `build.js` and type/paste this in:

```
var metalsmith        = require('metalsmith');

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Electroniq',
      description: 'Electroniq is sample metalsmith blog.'
    }
  })
  .source('./src')
  .destination('./public')
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Electroniq built!');
    }
  });
```

A basic Metalsmith setup can be more compact than this, but we've added a few things that are important. Let's go over this line by line. If you know what's going on here, feel free to skip ahead.

First, we require metalsmith itself:

```
var metalsmith        = require('metalsmith');
```

We'll need to do this for every plugin we use; most dependencies on your `package.json` file will also need to be declared/required here.

Next, we call the `metalsmith()` function itself and define metadata that'll be useful later. These values can be called from any of our templates. For now, we'll just include a name that we can later use as in `<title>` tag of our blog.

Next, we define our source folder (`.\src` that we created earlier), a destination folder where Metalsmith will output our static site (`.\public`), and call the `build()` function to build our site.

We've also included verbose error catching. Should Metalsmith encounter an exception, it'll be appended to the Javascript console. Otherwise, it'll post a message indicating that the build was successful.

Next, we'll write a makefile and point it to all our resources. Create a file called `Makefile` (with a capital M) and paste this in:

``` makefile
build: 	node_modules
				node build.js

node_modules: package.json
				npm install

.PHONY: build
```

This is what your `electroniq` directory should look like :

```
.
├── node_modules/
│   └── ...
├── src/
├── build.js
├── Makefile
└── package.json
```

You now have a basic Metalsmith setup. It doesn't do anything yet (other than copy any file you put in your source directory to your destination directory), but we can technically build our website.

Give it a go:

```
$ npm make build
```

Now let's make it actually do something.

## Markdown and Frontmatter

Using Markdown to write your posts makes a lot of sense: they stay readable and convert easily to standard HTML. In fact, this tutorial is written in Markdown.

Open `build.js` and add Markdown between `.source()` and `.destination()`, like so:

```javascript
// ...
    .source('./src')
    .destination('./public')
    .use(markdown())
    .build(function (err) {
// ...
```

And that's it. This is essentially how you add plugins to your workflow, except sometimes you can set parameters. We'll see that later.

Let's write a sample article in Markdown.

Create a new file in your `src` folder called `first-article.md`:

```markdown
---
title: "Bonjour Monde"
date: 2015-10-12
blurb: La fabuleuse histoire d'un texte en Markdown
---

# Bonjour monde

Oui je sais que ce texte est *en français* et que pas tout le monde va le comprendre.
Mais ce n'est que du **faux texte** donc je me permets.
```

The bit at the top between the `---` is called fontmatter. Here, it's in [YAML](http://yaml.org/) but that's not too important. These are just metadata that we'll be able to access in the template. Here we've included a *title*, a *date* and a *blurb*. You could also use add these kind of key/value pairs for keywords, categories, author name, modified date… you get the idea.

We don't have a template to display this content yet, but since we added Markdown to our workflow, Metalsmith will still be able to convert it to HTML. Let's build the website now to check.

```
$ npm make build
```

This will create a new folder called `public` with a file `first-post.html`. Your root directory should now look like this:

```
.
├── node_modules/
│   └── ...
├── src/
│   └── first-article.md
├── public/
│   └── first-article.html
├── build.js
├── Makefile
└── package.json
```

Open the generator `first-article.html` file on your editor. It will simply contain:

```
<h1>Bonjour monde</h1>

Oui je sais que c'est <em>en français</em> et que pas tout le monde va comprendre.
Mais ce n'est que du <strong>faux texte</strong> donc je me permets.
```

That's a start, but this page is incomplete. There's no <head> or navigation or anything, and we're not using information in our YAML frontmatter. What we need is a template to display this page. Let's make one now.

## Templates

One of the reasons to use a static site generator is to be able to use templates with HTML markup and variables we can reuse on different pages without having to repeat any of it. Another reason is to manage routing so we can have pretty permalinks.

Metalsmith comes with a plugin that lets you write your templates in pretty much [any templating engine](https://www.npmjs.com/package/consolidate). For our project, we'll use [Handlebars](http://handlebarsjs.com/). If you don't know what these are, don't worry. They're a way we can access data and variables from within our templates.

Let's start by installing the metalsmith templating plugin, called `layouts`:

```
$ npm install metalsmith-layouts --save
```

We'll also install Handlebars while we're at it:

```
$ npm install handlebars --save
```

We know that these dependencies will automatically be added to our `package.json` file. Now let's add them to our workflow. Open `build.js` and first require the two new packages:

```javascript
var metalsmith        = require('metalsmith');
var layouts           = require('metalsmith-layouts');
var handlebars        = require('handlebars');
// ...
```

And then add them to our workflow:

```javascript
// ...
    .source('./src')
    .destination('./public')
    .use(markdown()).
    .use(layouts({
      engine: 'handlebars',
      directory: './layout',
      default: 'article.html'
    }))
    .build(function (err) {
// ...
```

What this does is tell Metalsmith to use Handlebars templates, look for them in the `layouts` directory and use a template called `article.html` by default.

Let's create this directory and write this default template now:

```
$ mkdir layouts
```

Inside this folder, create a file called `article.html` with these contents:

```handlebars
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ site.name }}</title>
    <meta name="description" content="{{ blurb }}" />
  </head>
  <body>
    <h1>{{ title }}</h1>
    <div class="meta">
        Published: {{ date }}
    </div>
    <div class="blurb">
      {{ blurb }}
    </div>
    {{ contents}}
  </body>
</html>
```

It's a pretty standard HTML page, except for the Handlebars tags in `{{ }}`. Anything in those tags will be replaced by content from your templates. For example, we want the name of our website as the page's `<title>`.

Remember we already defined this in `build.js` as a global metadata, like so:

```javascript
// ...
metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Electroniq',
      description: 'Electroniq is sample metalsmith blog.'
    }
  })
// ...
```

In the template, we can access this information as `{{ site.name }}`. The other tags &mdash; `title`, `blurb` and `date` &mdash; come from our article's frontmatter.

The article itself can be accessed quite logically through the `{{ content }}` template tag.

To see this in action,  `make build` your website and open `public/first-article.html`. You should see this:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Electroniq</title>
    <meta name="description" content="Electroniq is sample metalsmith blog." />
  </head>
  <body>
    <h1>Bonjour Monde</h1>
    <div class="meta">
        Published: 2015-10-12
    </div>
    <div class="blurb">
      La fabuleuse histoire d'un texte en Markdown
    </div>
    <p>
      Oui je sais que c'est <em>en français</em> et que pas tout le monde va comprendre.
      Mais ce n'est que du <strong>faux texte</strong> donc je me permets.
    </p>
  </body>
</html>
```

So we now have an article page.

What we don't have is an index page that lists all the articles we publish. Let's create a copy of our article page and name it `index.html`. This page can look like this:

```handlebars
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{ site.name }}</title>
    <meta name="description" content="{{ site.description }}" />
  </head>
  <body>
    <h1>{{ site.name }}</h1>

    <ul class="recent">
    {{#each articles }}
      <li>
        <div class="title"><a href="{{ path }}">{{ title }}</a></div>
        <div class="date">{{ date }}</div>
      </li>
    {{/each_upto}}
    </ul>

  </body>
</html>
```

We've replaced the `{{ title }}`, which only exists for articles, with `{{ site.name }}` and we've switched out the `{{ blurb }}` for `{{ site.description }}`.

This is great, but we're repeating a lot of code. This is bad, because if we ever want to change something in the header, for example, we'd need to change it in every single page. That kinda ruins the point of using a site generator. We can split them into smaller sub-templates, or *partials*, that we can call from our main templates.


```handlebars
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{{#if title }}{ {title }} - {{/if}}{{ site.name }}</title>
    <meta name="description" content="{{#if blurb}}{{ blurb }}{{else}}{{#if description}}{{ description }}{{else}}{{ site.description }}{{/if}}{{/if}}" />
  </head>
  <body>
    <h1>{{ title }}</h1>
    <div class="meta">
        Published: {{ date }}
    </div>
    <div class="subtitle">
      {{ blurb }}
    </div>
    {{ contents}}
  </body>
</html>
```

## Routes and pretty permalinks

## Drafts and local serving

## Going Live (with GitHub Pages)

## Going further
