---
title: A Beginner's Guide to Crafting a Blog with Metalsmith
date: 2015-10-06
blurb: Neustadt.fr is built with Metalsmith, a node.js-based static site generator. In this tutorial I explain how you can build your own Metalsmith blog from scratch.
type: tutorial
draft: true
---

Neustadt.fr started, as many things have, with [a post on Hacker News](https://news.ycombinator.com/item?id=10001996). I stumbled on Jendrik Poloczek's [very simple, readable website](http://www.madewithtea.com/) after one of his articles made it to the front page. His website is apparently *powered by [Pelican](http://blog.getpelican.com/)*, a Python-based static site generator. I didn't really know what that meant but I was intrigued.

This came at a time when I was getting increasingly frustrated with the wastefulness, bloat and disregard for privacy in modern web design. Not to mention the layers and layers of dependencies. People who want a simple website today often end up with a dynamic database-dependent WordPress blog running a theme that has widgets, infinite scroll, lightbox, a media gallery, Google Analytics and jQuery animations built-in. And all they wanted was to post a few photos and articles every month. It's ridiculous.

## Why go static?

Simplicity and speed. Call it nostalgia but I like to keep things small, basic and elegant. There's something beautiful about a website in standard HTML, CSS and Javascript that can be hosted pretty much anywhere. Even Neocities.

With a static website, you don't have to worry about databases, SQL injections, PHP versions, security patches and server environments. Change hosts? Migrating is as simple as copy/paste. Then there's the speed. Between the caching and not having to query databases to dynamically generate pages every time, you end up with something very robust.

## Why Metalsmith?

Simplicity. Before choosing Metalsmith, I looked into Python-based [Pelican](http://blog.getpelican.com/), Ruby-based [Jekyll](https://jekyllrb.com/) and [Middleman](https://middlemanapp.com/), node.js-powered [Wintersmith](https://middlemanapp.com/) and Golang-powered [Hugo](https://gohugo.io/). They are all capable static site generators with active developer and user communities so you'd really be okay with any of them.

What I loved about Metalsmith is that it does nothing out of the box. It takes a source directory and spits everything out into a destination directory. If you want it to do anything at all, you need to build workflow with plugins. And in Metalsmith, *everything* is a plugin.

I don't have to *disable* features I don't need; I simply *add* the ones I want from a growing [list of over a 130 plugins](www.metalsmith.io/#the-plugins). Markdown, drafts, permalinks, code highlighting, templates -- they're all optional plugins.

## Requirements and audience

This tutorial is for beginners. I assume only that you are familiar with basic HTML/CSS and are at least a little bit comfortable using the command line. It helps if you are familiar with Javascript and JSON. If you aren't, you can always learn it as you go.

You don't need to know [node.js](https://nodejs.org).

To complete this tutorial, you will need:

- A computer running Windows, Mac OS X or almost any UNIX-based OS
- Shell access (like Terminal on Mac)
- A text editor (like [GitHub Atom](https://atom.io/))
- A web browser
- A web host if you want to go live

I usually also use Git for version control, but for sake of simplicity; I'll ignore it for this tutorial.

## Installing Node.js and Metalsmith

If you're running Windows or Mac OS X, the easiest way to install Node.js is to [download the precompiled binaries](https://nodejs.org/en/download/). If you're running Linux, you can use a [package manager](https://nodejs.org/en/download/package-manager/).

This installs both Node.js and [npm](https://nodejs.org/en/download/package-manager/), the node package manager that we'll be using to install all our plugins.

Once you have npm installed, you can go ahead and install metalsmith. Before you do so, I recommend you create a project directory. Let's call our site "Electroniq". On the command line, type:

$ mkdir electroniq

Then cd into that directory and install metalsmith like so :

$ npm install metalsmith

## A basic workflow

## Templates and routes

## Going Live (with GitHub Pages)

## Next Steps
