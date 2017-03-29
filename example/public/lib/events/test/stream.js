/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/

var assert = require( 'assert' )
  , Stream = require( '../src/stream' ).Stream;

assert( Stream !== 'undefined' );

checkStream();

function checkStream() {
  
  var q = new Stream()
    , responded = false
    , interupted = false;
  
  q.on( 'test1', response );
  q.on( 'test2', interupt );
  
  q.emit( 'test1' );
  
  assert( interupted );
  console.log( 'stream ok' );

  function response() {
    q.emit( 'test2' );
    responded = true;
  }

  function interupt() {
    assert( responded );
    interupted = true;
  }
}