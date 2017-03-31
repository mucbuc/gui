'use strict';

var Vec = require( '../lib/vec' ).Vec
  , test = require( 'tape' );

test( 'checkVec', (t) => {
  var a = new Vec( 0, 0 );

  t.equal( a.x, 0 );
  t.equal( a.y, 0 );
  a = a.add( new Vec( 2, 3 ) );
  t.equal( a.x, 2 );
  t.equal( a.y, 3 );
  t.end();
});
