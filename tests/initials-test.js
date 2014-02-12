/* global initials, test, equal, deepEqual */

test( 'initials( name )', function() {
  'use strict';

  equal( initials('John Doe'), 'JD', 'John Doe ☛ JD' );
  equal( initials('john doe'), 'jd', 'joe doe ☛ jd' );
  equal( initials('John Doe <joe@example.com>'), 'JD', 'John Doe <joe@example.com> ☛ JD' );
  equal( initials('joe@example.com'), 'jo', 'joe@example.com ☛ jo' );
  equal( initials('John Doe (dj)'), 'dj', 'John Doe (dj) ☛ dj' );
});

test( 'initials( name, 3 )', function() {
  'use strict';

  equal( initials('John Doe', 3), 'JDo', 'John Doe ☛ JDo' );
  equal( initials('John D.', 3), 'JoD', 'John D. ☛ JoD' );
});

test( 'initials( namesArray )', function() {
  'use strict';

  deepEqual( initials(['John Doe', 'Robert Roe', 'Larry Loe']), ['JD', 'RR', 'LL'], 'John Doe, Robert Roe, Larry Loe ☛ JD, RR, LL' );
  deepEqual( initials(['John Doe', 'Jane Dane']), ['JDo', 'JDa'], 'guarantees unique initials: John Doe, Jane Dane ☛ JDo, JDa' );
  deepEqual( initials(['John Doe', 'Jane Dane', 'John Doe']), ['JDo', 'JDa', 'JDo'], 'same initials for same names: John Doe, Jane Dane, John Doe ☛ JDo, JDa, JDo' );
  deepEqual( initials(['John Smith', 'Jane Smith']), ['JoS', 'JaS'], 'shortest initials possible: John Smith, Jane Smith ☛ JoS, JaS' );

  deepEqual( initials(['John Doe (JoDo)', 'Jane Dane']), ['JoDo', 'JD'], 'respects preferred initials: John Doe (JoDo), Jane Dane ☛ JoDo, JD' );
  deepEqual( initials(['John Doe (JoDo)', 'Jane Dane (JoDo)']), ['JoDo', 'JoDo'], 'conflicting initials can be enforced: John Doe (JoDo), Jane Dane (JoDo) ☛ JoDo, JoDo' );
  deepEqual( initials(['John Doe (JD)', 'Jane Dane']), ['JD', 'JDa'], 'preferred initials are respected in other names: John Doe (JD), Jane Dane ☛ JD, JDa' );

  deepEqual( initials(['John Doe <joe@example.com>']), ['JD'], 'emails are ignored in arrays' );
  deepEqual( initials(['joe@example.com']), ['jo'], 'domains are ignored when a name is an email' );
});
