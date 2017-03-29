/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/

var assert = require( 'assert' )
  , Queue = require( '../src/queue' ).Queue;

assert( Queue !== 'undefined' );

checkQueuePop();

function checkQueuePop() {
  
  var q = new Queue()
    , gotPopped = false
    , val = 342;
  
  q.pushBack( val ); 
  
  assert( q.tryPop( function( v ) {
    assert( v == val );
    gotPopped = true;
  } ) );
  
  assert( gotPopped );
  
  assert( !q.tryPop() );

  console.log( 'queue ok' );
}