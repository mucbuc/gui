/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
*/ 

var assert = require( 'assert' )
  , Vec = require( '../lib/vec' ).Vec;

checkVec();

function checkVec() {
  var a = new Vec( 0, 0 );

  assert( a.x == 0 && a.y == 0 );
  a = a.add( new Vec( 2, 3 ) );
  assert( a.x == 2 && a.y == 3 );

  console.log( 'vec passed' );
}

exports.checkVec = checkVec;
