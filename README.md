Initials. Because JD is shorter than JD
=======================================

> a JavaScript function to get initials from names

Installation
------------

Install using [bower](http://bower.io/) for usage in browser:

```
bower install --save initials
```

Install using [npm](https://npmjs.org/) for node.js:

```
npm install --save initials
```


Usage
-----

```js
console.log( initials('John Doe') );
// 'JD'

console.log( initials(['John Doe', 'Robert Roe']) );
// ['JD', 'RR']
```

Notes
-----

Preffered initials can be passed in `(JD)`, e.g.

```js
console.log( initials('John Doe (JoDo)') );
// 'JoDo'
```

If a name contains an email, it gets ignored when calculating initials

```js
console.log( initials('John Doe joe@example.com') );
// 'JD'
```

If a name _is_ an email, the domain part gets ignored

```js
console.log( initials('joe@example.com') );
// 'jo'
```

When passing an Array of names, doublicates of initials are avoided

```js
console.log( initials(['John Doe', 'Jane Dane']) );
// ['JDo', 'JDa']
```

Todo
----

I'd say the implementations is robust, but has room for
performance optimizations. Pull requests welcome!


Fine Print
----------

initials.js have been authored by [Gregor Martynus](https://github.com/gr2m),
proud member of [Team Hoodie](http://hood.ie/). Support our work: [gittip us](https://www.gittip.com/hoodiehq/).

License: MIT
