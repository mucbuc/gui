/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
<om636/lib/
*/ 


var assert = require( 'assert' )
  , Vec = require( '../lib/vec' ).Vec
  , Rect = require( '../lib/rect' ).Rect;
  
checkRect();

function checkRect() {
  var a = new Rect( new Vec( 1, 2 ), new Vec( -2, 3 ) ); 
  
  assert( a.width() == 2 );
  assert( a.height() == 3 ); 
  assert( a.left == 1 );
  assert( a.top == 2 );
  assert( a.right == 3 );
  assert( a.bottom == 5 );

  console.log( "rect passed" );
}

exports.checkRect = checkRect;
