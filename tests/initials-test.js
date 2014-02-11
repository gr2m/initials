/* global initials, test, equal */

test( 'initials( name )', function() {
  'use strict';

  equal( initials('Joe Doe'), 'JD', 'Joe Doe ☛ JD' );
  equal( initials('joe doe'), 'jd', 'joe doe ☛ jd' );
  equal( initials('Joe Doe <joe@example.com>'), 'JD', 'Joe Doe <joe@example.com> ☛ JD' );
  equal( initials('joe@example.com'), 'jo', 'joe@example.com ☛ jo' );
  equal( initials('Joe Doe (dj)'), 'dj', 'Joe Doe (dj) ☛ dj' );
});
