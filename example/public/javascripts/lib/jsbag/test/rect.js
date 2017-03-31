'use strict';

var Vec = require( '../lib/vec' ).Vec
  , Rect = require( '../lib/rect' ).Rect
  , test = require( 'tape' );

test( 'checkRect', (t) => {
  var a = new Rect( new Vec( 1, 2 ), new Vec( -2, 3 ) ); 
  
  t.equal( a.width(), 2 );
  t.equal( a.height(), 3 );
  t.equal( a.left, 1 );
  t.equal( a.top, 2 );
  t.equal( a.right, 3 );
  t.equal( a.bottom, 5 );
  t.end();
});
