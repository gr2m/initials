var initials = require('../lib/initials')
var test = require('tape')

test('has function', function (t) {
  t.is(typeof initials, 'function', 'has method initials')
  t.is(typeof initials.addTo, 'function', 'has method initials.addTo')
  t.is(typeof initials.parse, 'function', 'has method initials.parse')
  t.is(typeof initials.find, 'function', 'has method initials.find')

  t.end()
})

test('initials(name)', function (t) {
  t.equal(initials('John Doe'), 'JD', 'John Doe ☛ JD')
  t.equal(initials('john doe'), 'jd', 'joe doe ☛ jd')
  t.equal(initials('John Doe <joe@example.com>'), 'JD', 'John Doe <joe@example.com> ☛ JD')
  t.equal(initials('joe@example.com'), 'jo', 'joe@example.com ☛ jo')
  t.equal(initials('John Doe (dj)'), 'dj', 'John Doe (dj) ☛ dj')

  // https://github.com/gr2m/initials/issues/6
  t.equal(initials('안형준'), '안형', '안형준 -> 안형')

  t.end()
})

test('initials(name, 3)', function (t) {
  t.equal(initials('John Doe', 3), 'JDo', 'John Doe ☛ JDo')
  t.equal(initials('John D.', 3), 'JoD', 'John D. ☛ JoD')

  t.end()
})

test('initials(namesArray)', function (t) {
  t.deepEqual(initials(['John Doe', 'Robert Roe', 'Larry Loe']), ['JD', 'RR', 'LL'], 'John Doe, Robert Roe, Larry Loe ☛ JD, RR, LL')
  t.deepEqual(initials(['John Doe', 'Jane Dane']), ['JDo', 'JDa'], 'guarantees unique initials: John Doe, Jane Dane ☛ JDo, JDa')
  t.deepEqual(initials(['John Doe (JD)', 'Jane Dane']), ['JD', 'JDa'], 'guarantees unique initials, respecting preferences: John Doe (JD), Jane Dane ☛ JDo, JDa')
  t.deepEqual(initials(['John Doe', 'Jane Dane', 'John Doe']), ['JDo', 'JDa', 'JDo'], 'same initials for same names: John Doe, Jane Dane, John Doe ☛ JDo, JDa, JDo')
  t.deepEqual(initials(['John Smith', 'Jane Smith']), ['JSm', 'JaS'], 'shortest initials possible: John Smith, Jane Smith ☛ JSm, JaS')
  t.deepEqual(initials(['John Doe (JoDo)', 'Jane Dane']), ['JoDo', 'JD'], 'respects preferred initials: John Doe (JoDo), Jane Dane ☛ JoDo, JD')
  t.deepEqual(initials(['John Doe (JoDo)', 'Jane Dane (JoDo)']), ['JoDo', 'JoDo'], 'conflicting initials can be enforced: John Doe (JoDo), Jane Dane (JoDo) ☛ JoDo, JoDo')
  t.deepEqual(initials(['John Doe (JD)', 'Jane Dane']), ['JD', 'JDa'], 'preferred initials are respected in other names: John Doe (JD), Jane Dane ☛ JD, JDa')
  t.deepEqual(initials(['John Doe <joe@example.com>']), ['JD'], 'emails are ignored in arrays')
  t.deepEqual(initials(['joe@example.com']), ['jo'], 'domains are ignored when a name is an email')

  // https://github.com/gr2m/initials/issues/1
  t.deepEqual(initials(['j']), ['j'], 'j ☛ j')

  // https://github.com/gr2m/initials/issues/14
  t.deepEqual(initials(['Moe Minutes', 'Moe Min']).sort(), ['MMi', 'MoM'], '["Moe Minutes", "Moe Min"] ☛ ["MoM", "MMi"]')

  t.end()
})

test('initials(nameOrNames, {existing: initialsForNames})', function (t) {
  t.equal(initials('John Doe', {
    existing: {
      'John Doe': 'JoDo'
    }
  }), 'JoDo', 'respect existing initials')

  t.deepEqual(initials(['John Doe', 'Jane Dane'], {
    existing: {
      'John Doe': 'JD'
    }
  }), ['JD', 'JDa'], 'respect existing initials')

  t.end()
})

test('initials.addTo(name)', function (t) {
  t.equal(initials.addTo('John Doe'), 'John Doe (JD)', 'John Doe ☛ John Doe (JD)')
  t.equal(initials.addTo('(JJ) Jack Johnson'), 'Jack Johnson (JJ)', 'Jack Johnson ☛ Jack Johnson (JJ)')
  t.equal(initials.addTo('JD'), 'JD', 'JD ☛ JD')
  t.equal(initials.addTo('JD (JD)'), 'JD (JD)', 'JD (JD) ☛ JD (JD)')
  t.equal(initials.addTo('John Doe (JoDo) joe@example.com'), 'John Doe (JoDo) <joe@example.com>', 'John Doe (JoDo) joe@example.com ☛ John Doe (JoDo) <joe@example.com>')
  t.equal(initials.addTo('joe@example.com'), 'joe@example.com (jo)', 'joe@example.com ☛ joe@example.com (jo)')
  t.equal(initials.addTo('joe (j)'), 'joe (j)', 'joe (j) ☛ joe (j)')
  t.equal(initials.addTo('Frönkää Üüd'), 'Frönkää Üüd (FÜ)', 'Frönkää Üüd ☛ Frönkää Üüd (FÜ)')
  t.equal(initials.addTo('funky (fu)'), 'funky (fu)', 'funky (fu) ☛ funky (fu)')

  // https://github.com/gr2m/initials/issues/7
  t.equal(initials.addTo('test.test@test.org <test.test@test.org>'), 'test.test@test.org (tt)', 'test.test@test.org <test.test@test.org> ☛ test.test@test.org (tt)')

  t.end()
})

test('initials.addTo(namesArray)', function (t) {
  t.deepEqual(initials.addTo(['John Doe', 'Robert Roe', 'Larry Loe']), ['John Doe (JD)', 'Robert Roe (RR)', 'Larry Loe (LL)'], 'John Doe, Robert Roe, Larry Loe ☛ John Doe (JD), Robert Roe (RR), Larry Loe (LL)')
  t.deepEqual(initials.addTo(['John Doe', 'Jane Dane']), ['John Doe (JDo)', 'Jane Dane (JDa)'], 'John Doe, Jane Dane ☛ John Doe (JDo), Jane Dane (JDa)')

  t.end()
})

test('initials.addTo(nameOrNames, {existing: initialsForNames})', function (t) {
  t.equal(
    initials.addTo('John Doe', {
      existing: {
        'John Doe': 'JoDo'
      }
    }), 'John Doe (JoDo)', 'respect existing initials')

  t.deepEqual(
    initials.addTo(['John Doe', 'Jane Dane'], {
      existing: {
        'John Doe': 'JD'
      }
    }), ['John Doe (JD)', 'Jane Dane (JDa)'], 'respect existing initials')

  t.end()
})

test('initials.parse(name)', function (t) {
  t.deepEqual(initials.parse('John Doe'), { name: 'John Doe', initials: 'JD' }, 'John Doe ☛ name: John Doe, initials: JD')
  t.deepEqual(initials.parse('JD'), { initials: 'JD' }, 'JD ☛ initials: JD')
  t.deepEqual(initials.parse('joe@example.com'), { email: 'joe@example.com', initials: 'jo' }, 'joe@example.com ☛ email: joe@example.com, initials: jo')
  t.deepEqual(initials.parse('John Doe <joe@example.com>'), { name: 'John Doe', initials: 'JD', email: 'joe@example.com' }, 'joe@example.com ☛ email: joe@example.com, initials: jo')

  t.end()
})

test('initials.parse(namesArray)', function (t) {
  t.deepEqual(initials.parse(['John Doe', 'Robert Roe', 'Larry Loe']), [{ name: 'John Doe', initials: 'JD' }, { name: 'Robert Roe', initials: 'RR' }, { name: 'Larry Loe', initials: 'LL' }], 'John Doe, Robert Roe, Larry Loe ☛ name: John Doe, initials: JD; name: Robert Roe, initials: RR; name: Larry Loe, initials: LL')

  t.end()
})

test('initials.parse(nameOrNames, {existing: initialsForNames})', function (t) {
  t.deepEqual(initials.parse('John Doe', {
    existing: {
      'John Doe': 'JoDo'
    }
  }), { name: 'John Doe', initials: 'JoDo' }, 'respect existing initials for single name')

  t.deepEqual(initials.parse(['John Doe', 'Jane Dane'], {
    existing: {
      'John Doe': 'JD'
    }
  }), [{ name: 'John Doe', initials: 'JD' }, { name: 'Jane Dane', initials: 'JDa' }], 'respect existing initials  for multiple names')

  t.end()
})

test('initials(), no params', function (t) {
  t.equal(initials(), '', 'initials() without nameOrNames, no initials')
  t.equal(initials.addTo(), '', 'initials.addTo() without nameOrNames, no initials')
  t.deepEqual(initials.parse(), {}, 'initials.parse() without nameOrNames, no initials')

  t.deepEqual(initials(['', '']), ['', ''], 'initials with multiple persons but no names')

  t.end()
})

test('initials(), name.length is less 3', function (t) {
  t.equal(initials('K'), 'K', 'name.length is < 2, so the initials are equal to name')
  t.equal(initials('Mo'), 'Mo', 'name.length is < 3, so the initials are equal to name')

  t.end()
})

// uncomment the block below to run a single test only
// test.only('debug', function (t) {
//   t.equal(initials('foo'), 'bar', 'debugging')
// })
