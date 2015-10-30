Initials. Because JD is shorter than John Doe
=============================================

> extracts initials from and adds initials to names

[![Build Status](https://travis-ci.org/gr2m/initials.svg?branch=master)](https://travis-ci.org/gr2m/initials)
[![Coverage Status](https://coveralls.io/repos/gr2m/initials/badge.svg?branch=master)](https://coveralls.io/r/gr2m/initials?branch=master)
[![Dependency Status](https://david-dm.org/gr2m/initials.svg)](https://david-dm.org/gr2m/initials)
[![devDependency Status](https://david-dm.org/gr2m/initials/dev-status.svg)](https://david-dm.org/gr2m/initials#info=devDependencies)

Installation
------------

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

When passing an Array of names, duplicates of initials are avoided

```js
console.log( initials(['John Doe', 'Jane Dane']) );
// ['JDo', 'JDa']
```

Test
----

```
npm test
```


Fine Print
----------

initials have been authored by [Gregor Martynus](https://github.com/gr2m),
proud member of the [Hoodie Community](http://hood.ie/).

License: MIT
