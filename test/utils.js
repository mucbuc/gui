var assert = require( 'assert' )
  , lib = require( './config.json' ).lib
  , utils = require( lib + 'utils' )
  , Vec = require( lib + 'vec' ).Vec
  , Rect = require( lib + 'rect' ).Rect;
  
assert( utils !== 'undefined' );

//checkUtils();

function checkUtils() {
  checkVec(); 
  checkRect();
  checkSnapLine();
  console.log( 'utils ok' );
}

function checkSnapLine() {
  checkSnapLineRight();
  checkSnapLineUp();
}

function checkSnapLineRight() {

  var sl = new utils.SnapLine( utils.direction.RIGHT );

  sl.attach( { right: 0, width: 1 } );
  sl.attach( { right: 0, width: 2 } );
  sl.attach( { right: 0, width: 3 } );
  sl.attach( { right: 0, width: 4 } );

  assert( sl.displacement() == 10 );
  assert( sl.step( new Vec( 0, 0 ) ) == 10 );
  assert( sl.step( new Vec( 0, 0 ), 3 ) == 19 );
}

function checkSnapLineUp() {

  var sl = new utils.SnapLine( utils.direction.UP );

  sl.attach( { bottom: 0, height: 1 } );
  sl.attach( { bottom: 0, height: 2 } );
  sl.attach( { bottom: 0, height: 3 } );
  sl.attach( { bottom: 0, height: 4 } );

  assert( sl.displacement() == 10 );
  assert( sl.step( new Vec( 0, 0 ) ) == -10 );
  assert( sl.step( new Vec( 0, 0 ), 5 ) == -25 );
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
