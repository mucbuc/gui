#!/usr/bin/env node

var assert = require( 'assert' )
  , requireLibFile = require( './base' ).requireLibFile
  , Factory = requireLibFile( 'factory.js' ).Factory;
  
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
