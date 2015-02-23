/* global describe, it, expect */
'use strict';
var initials = require('../initials');

describe( 'initials( name )', function() {
  it('John Doe ☛ JD', function() {
    expect( initials('John Doe') ).to.equal('JD');
  });
  it('joe doe ☛ jd', function() {
    expect( initials('john doe') ).to.equal('jd');
  });
  it('John Doe <joe@example.com> ☛ JD', function() {
    expect( initials('John Doe <joe@example.com>') ).to.equal('JD');
  });
  it('joe@example.com ☛ jo', function() {
    expect( initials('joe@example.com') ).to.equal('jo');
  });
  it('John Doe (dj) ☛ dj', function() {
    expect( initials('John Doe (dj)') ).to.equal('dj');
  });

  // https://github.com/gr2m/initials/issues/6
  it('안형준 -> 안형', function() {
    expect( initials('안형준') ).to.equal('안형');
  });
});

describe( 'initials( name, 3 )', function() {
  it('John Doe ☛ JDo', function() {
    expect( initials('John Doe', 3) ).to.equal('JDo');
  });
  it('John D. ☛ JoD', function() {
    expect( initials('John D.', 3) ).to.equal('JoD');
  });
});

describe( 'initials( namesArray )', function() {
  it('John Doe, Robert Roe, Larry Loe ☛ JD, RR, LL', function() {
    expect( initials(['John Doe', 'Robert Roe', 'Larry Loe'])).to.deep.equal(['JD', 'RR', 'LL']);
  });
  it('guarantees unique initials: John Doe, Jane Dane ☛ JDo, JDa', function() {
    expect( initials(['John Doe', 'Jane Dane'])).to.deep.equal(['JDo', 'JDa']);
  });
  it('guarantees unique initials, respecting preferences: John Doe (JD), Jane Dane ☛ JDo, JDa', function() {
    expect( initials(['John Doe (JD)', 'Jane Dane'])).to.deep.equal(['JD', 'JDa']);
  });
  it('same initials for same names: John Doe, Jane Dane, John Doe ☛ JDo, JDa, JDo', function() {
    expect( initials(['John Doe', 'Jane Dane', 'John Doe'])).to.deep.equal(['JDo', 'JDa', 'JDo']);
  });
  it('shortest initials possible: John Smith, Jane Smith ☛ JoS, JaS', function() {
    expect( initials(['John Smith', 'Jane Smith'])).to.deep.equal(['JoS', 'JaS']);
  });

  it('respects preferred initials: John Doe (JoDo), Jane Dane ☛ JoDo, JD', function() {
    expect( initials(['John Doe (JoDo)', 'Jane Dane'])).to.deep.equal(['JoDo', 'JD']);
  });
  it('conflicting initials can be enforced: John Doe (JoDo), Jane Dane (JoDo) ☛ JoDo, JoDo', function() {
    expect( initials(['John Doe (JoDo)','Jane Dane (JoDo)'])).to.deep.equal( ['JoDo', 'JoDo']);
  });
  it('preferred initials are respected in other names: John Doe (JD), Jane Dane ☛ JD, JDa', function() {
    expect( initials(['John Doe (JD)', 'Jane Dane'])).to.deep.equal( ['JD', 'JDa']);
  });

  it('emails are ignored in arrays', function() {
    expect( initials(['John Doe <joe@example.com>'])).to.deep.equal(['JD']);
  });
  it('domains are ignored when a name is an email', function() {
    expect( initials(['joe@example.com'])).to.deep.equal(['jo']);
  });

  it('domains are ignored when a name is an email', function() {
    expect( initials(['joe@example.com'])).to.deep.equal(['jo']);
  });

  // https://github.com/gr2m/initials/issues/1
  it('j ☛ j', function() {
    expect( initials(['j'])).to.deep.equal(['j']);
  });
});

describe( 'initials( nameOrNames, {existing: initialsForNames} )', function() {
  it('respect existing initials', function() {
    expect( initials('John Doe', {
      existing: {
        'John Doe': 'JoDo'
      }
    })).to.deep.equal('JoDo');
  });

  it('respect existing initials', function() {
    expect( initials(['John Doe', 'Jane Dane'], {
      existing: {
        'John Doe': 'JD'
      }
    })).to.deep.equal(['JD', 'JDa']);
  });
});

describe( 'initials.addTo( name )', function() {
  it('John Doe ☛ John Doe (JD)',function() {
    expect( initials.addTo('John Doe'), 'John Doe (JD)');
  });
  it('Jack Johnson ☛ Jack Johnson (JJ)',function() {
    expect( initials.addTo('(JJ) Jack Johnson'), 'Jack Johnson (JJ)');
  });
  it('JD ☛ JD',function() {
    expect( initials.addTo('JD'), 'JD');
  });
  it('JD (JD) ☛ JD (JD)',function() {
    expect( initials.addTo('JD (JD)'), 'JD (JD)');
  });
  it('John Doe (JoDo) joe@example.com ☛ John Doe (JoDo) <joe@example.com>',function() {
    expect( initials.addTo('John Doe (JoDo) joe@example.com'), 'John Doe (JoDo) <joe@example.com>');
  });
  it('joe@example.com ☛ joe@example.com (jo)',function() {
    expect( initials.addTo('joe@example.com'), 'joe@example.com (jo)');
  });
  it('joe (j) ☛ joe (j)',function() {
    expect( initials.addTo('joe (j)'), 'joe (j)');
  });
  it('Frönkää Üüd ☛ Frönkää Üüd (FÜ)',function() {
    expect( initials.addTo('Frönkää Üüd'), 'Frönkää Üüd (FÜ)');
  });
  it('funky (fu) ☛ funky (fu)',function() {
    expect( initials.addTo('funky (fu)'), 'funky (fu)');
  });
});
describe( 'initials.addTo( namesArray )', function() {
  it('John Doe, Robert Roe, Larry Loe ☛ John Doe (JD), Robert Roe (RR), Larry Loe (LL)',function() {
    expect( initials.addTo(['John Doe', 'Robert Roe', 'Larry Loe']), ['John Doe (JD)', 'Robert Roe (RR)', 'Larry Loe (LL)']);
  });
  it('John Doe, Jane Dane ☛ John Doe (JDo), Jane Dane (JDa)',function() {
    expect( initials.addTo(['John Doe', 'Jane Dane']), ['John Doe (JDo)', 'Jane Dane (JDa)']);
  });
});

describe( 'initials.addTo( nameOrNames, {existing: initialsForNames} )', function() {
  it('respect existing initials', function() {
    expect( initials.addTo('John Doe', {
      existing: {
        'John Doe': 'JoDo'
      }
    })).to.equal('John Doe (JoDo)');
  });

  it('respect existing initials', function() {
    expect( initials.addTo(['John Doe', 'Jane Dane'], {
      existing: {
        'John Doe': 'JD'
      }
    })).to.deep.equal(['John Doe (JD)', 'Jane Dane (JDa)']);
  });
});

describe( 'initials.parse( name )', function() {
  it('John Doe ☛ name: John Doe, initials: JD', function() {
    expect( initials.parse('John Doe') )
    .to.deep.equal({name: 'John Doe', initials: 'JD'});
  });
  it('JD ☛ initials: JD', function() {
    expect( initials.parse('JD') )
    .to.deep.equal({initials: 'JD'});
  });
  it('joe@example.com ☛ email: joe@example.com, initials: jo', function() {
    expect( initials.parse('joe@example.com') )
    .to.deep.equal({email: 'joe@example.com', initials: 'jo'});
  });
  it('joe@example.com ☛ email: joe@example.com, initials: jo', function() {
    expect( initials.parse('John Doe <joe@example.com>') )
    .to.deep.equal({name: 'John Doe', initials: 'JD', email: 'joe@example.com'});
  });
});

describe( 'initials.parse( namesArray )', function() {
  it('John Doe, Robert Roe, Larry Loe ☛ name: John Doe, initials: JD; name: Robert Roe, initials: RR; name: Larry Loe, initials: LL', function() {
    expect( initials.parse(['John Doe', 'Robert Roe', 'Larry Loe']) )
    .to.deep.equal([{name: 'John Doe', initials: 'JD'},{name: 'Robert Roe', initials: 'RR'},{name: 'Larry Loe', initials: 'LL'}]);
  });
});

describe( 'initials.parse( nameOrNames, {existing: initialsForNames} )', function() {
  it('respect existing initials for single name', function() {
    expect( initials.parse('John Doe', {
      existing: {
        'John Doe': 'JoDo'
      }
    })).to.deep.equal({name: 'John Doe', initials: 'JoDo'});
  });

  it('respect existing initials  for multiple names', function() {
    expect( initials.parse(['John Doe', 'Jane Dane'], {
      existing: {
        'John Doe': 'JD'
      }
    })).to.deep.equal([{name: 'John Doe', initials: 'JD'}, {name: 'Jane Dane', initials: 'JDa'}]);
  });
});


// // describe('debug', function() {
// //   equal( initials('John Doe', 3), 'JDo', 'John Doe ☛ JDo' );
// // });
