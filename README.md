Initials. Because JD is shorter than John Doe
=============================================

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
initials('John Doe')
// 'JD'

initials(['John Doe', 'Robert Roe'])
// ['JD', 'RR']

// alias for initials('John Doe')
initials.find('John Doe')

// parse name(s)
initials.parse('John Doe')
// {name: 'John Doe', initials: 'JD'}

// add initials to name(s)
initials.addTo('John Doe')
// 'John Doe (JD)'

// pass existing initials for names
initials(['John Doe', 'Jane Dane'], {
  existing: { 'John Doe': 'JD' }
})
// ['JD', 'JDa']
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
