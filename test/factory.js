/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
<om636/lib/
*/ 


var assert = require( 'assert' )
  , lib = require( './config.json' ).lib
  , Factory = require( lib + 'factory.js' ).Factory;
  
assert( Factory !== 'undefined' );  

checkFactory();

function checkFactory() {
  
  var f = new Factory()
    , gotHit = false
    , r = 0;
  
  f.register( 'tester', Tester );
  r = f.create( 'tester', true );
  
  assert( gotHit ); 
  
  function Tester( v ) {
    gotHit = v;
  }
  
  console.log( 'factory ok' );
}

exports.checkFactory = checkFactory;