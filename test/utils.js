var assert = require( 'assert' )
  , lib = require( './config.json' ).lib
  , utils = require( lib + 'utils' )
  , Vec = utils.Vec
  , Rect = utils.Rect;
  
assert( utils != undefined );

checkUtils();

function checkUtils() {
  checkVec(); 
  checkRect();
  console.log( 'utils ok' );
}

function checkVec() {
  var a = new Vec( 0, 0 );

  assert( a.x == 0 && a.y == 0 );
  a = a.add( new Vec( 2, 3 ) );
  assert( a.x == 2 && a.y == 3 );
}

function checkRect() {
  var a = new Rect( new Vec( 1, 2 ), new Vec( -2, 3 ) ); 
  
  assert( a.width() == 2 );
  assert( a.height() == 3 ); 
  assert( a.left() == -1 );
  assert( a.top() == 2 );
  assert( a.right() == 1 );
  assert( a.bottom() == 5 );
}

exports.checkUtils = checkUtils;
