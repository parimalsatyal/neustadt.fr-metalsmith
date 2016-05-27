---
title: "We Need to Stop Breaking the Web"
date: 2016-05-16
blurb: "We're quietly replacing the internet that connected and empowered people with one that restricts and commoditizes users. And we need to stop it."
type: essay
draft: false
keyword: internet, break, empower, designers, open, privacy, rights, free, web
---

We're breaking the web.

That's right, us architects of the modern web — web designers, UX designers, developers, creative directors, social media managers, data scientists, product managers, start-up people, strategists — we're breaking one of humanity's greatest inventions without even realizing it.

Most of us have no idea what the web is. Sure, we know about *immersive experiences*, *personalized content*, *responsive design*, *parallax scrolling*. We know that companies today need a solid *social media strategy* for *good CRM* and that *good user experience* should be at the core of a good web strategy. But really we have no idea.

If we did, we wouldn't be producing bloated websites that weigh in over 3 MB, have a dozens of dependencies, override native browser controls, make over a hundred external resource calls, share user data with untrusted third-party "partners", store over 20 cookies and do all this over an unencrypted connection – to display one article.

(Need to find examples)
This 537-word article on CNN with one image weighs 2.8 Megabytes, store 39 third party cookies (that have nothing to do with CNN), makes 131 unsecure requests to 67 unique hosts and leaks your referer information (which can contain information about your browser, location, system) to any website it links to. The actual article (and the image) itself require only kB.

This article about software spying on you on LeMonde.fr is worse: it weighs 2.9 Megabytes, stores 139 third-party cookies, makes 388 (!) insecure third-party requests to 113 unique hosts, also leaks your referrer information and also does not bother to encrypt your connection.

That's insane. How did we come to this?

## What's the problem?

To understand the problem, we need to understand what the web is at its simplest. We could use an analogy, but let's not. Let's take take you and me. We're communicating. You might not know who I am, where I am, what I do for a living or what my nationality is, but you what I think about the current state of the web. You could be in any country, in any time zone, using any kind of computer, with any kind of political views. And here you are, reading what I wrote. As X (author of the words article) put it, "".  

How did we do this? It sounds obvious. It might not even fascinate us anymore, but it's worth asking the question.

I wrote words into a text file with some formatting using some very basic (free) tools and uploaded it to a web server. I gave that web server a public address (using a domain name) and posted the link somewhere. You somehow came across that link. Maybe you saw it on Facebook, maybe someone emailed it to you or maybe you saw it on another website. And now here you are. Simple as that.

A web server, a public address and an HTML file are all that you need to share your thoughts (or indeed, art, sound or software) with anyone in the world. No authority from which to seek approval, no editorial board, no publisher, no need to appeal to authority or to celebrity.

That's what the web makes possible. It connects people. In fact, the browser you're reading this on (Chrome, Firefox, Safari, Links, whatever), the web server that's hosting this website (Nginx), the operating system that this server runs on (Ubuntu), the programming tools used to make it all work (python, gcc, node.js...) -- all of these things were created collectively by contributors all around the world, brought together by HTTP.

The web is open and democratic by design and it empowers people, whoever or wherever they are.

That's the web we're breaking. 

## Bloat and Dependency

According to X, the average web page on the internet is now the size of a Doom installation, or about 3 Mb. That's a lot of data. In fact, you could share the the complete works Shakespeare, X and Y combined with 3 Mb. The problem isn't necessarily large file sizes, it's what's taking up most of that space.

If we go back to that LeMonde article and check network traffic, we notice that much of that space is taken by background resources, things that you don't see: fonts, images, Javascript libraries.

## Recentralization (Gatekeepers)
	- How simple is it go online? Very simple. Anyone can do it. It's nice to have services but shouldn't forget that we don't *need it*
	- We let them become the arbitrers of content. And with increasing "personalization" (the weird assumption that somehow if I look something up, that that should establish a pattern and that I'd want more of the same), filter bubble.

## The Death of Anonymity

## The web as a market ("users" = value) instead of playing field, security vulnerabilities


## Design, Art and Fun

We recognize generally that responsive websites are good. But why? It comes down to device agnosticism. Put simply, a responsive website is able to adapt to any device it's viewed in: a smartphone with a tiny screen or a full-blown browser on a wide-screen display. As (this guy)[#] very eloquently showed, a webpage is *by default* responsive. Which is to say, if you put text on an HTML file, it'll adapt to anything.

What we do these days is we make insanely complicated layouts and then add a bunch of extra conditionals to make the website responsive again.

## Accessibility (maybe 1)








### Problem 1: Bloat

There was a report about how the average website today weighs about the size of a Doom installation. Yes, Doom the multi-level, interactive,  game. That's a lot.

### Problem 2: Disregard for Privacy
The Le Monde article I linked to send your information to 388 insecure "partners". These are entities that you don't know.

### Problem 3: Bad Design

### Problem 4: Bad Security

### Problem 5: Accessibility

## What the Web Can Be

## Restoring Sanity

## Final Thoughts





And now we're using that technology people gave away for free not to connect to other people, but to treat them as *consumers*, *users*, *eye balls*, and *audience*. We use it to track them, to analyse their behavior and target them for a "personalized experience". We're less concerned with making our work accessible to a majority of people and more concerned.

Let's look at five different problems that plague modern web design and see what we can do about it.
