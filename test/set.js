/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
This is the result for the Unknown Worlds GUIFramework design test.
*/ 


var assert = require( 'assert' )
  , lib = require( './config.json' ).lib
  , Set = require( lib + 'set' ).Set;

assert( Set !== 'undefined' );  

checkSet();

function checkSet() {
  var s = new Set()
    , gotHit = false;
    
  // check resource
  assert( Set != 'undefined' );
  
  // check include|contains|length
  s.include( checkSet );
  assert( s.contains( checkSet ) && s.length == 1 );

  // check exclude
  s.exclude( checkSet );
  assert( !s.contains( checkSet ) && s.length == 0 );
  
  // check for each
  s.include( hitIt );
  s.forEach( function( f ) {
    f();
  } );

  assert( gotHit );

  function hitIt() { 
    gotHit = true;
  }
  
  // check insertUnique
  assert( !s.includeUnique( hitIt ) );
  s.exclude( hitIt );
  assert( s.includeUnique( hitIt ) );
  
  console.log( 'set ok' );
}

exports.checkSet = checkSet;