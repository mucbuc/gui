#!/usr/bin/env node

var test = require( 'tape' )
  , requireLibFile = require( './base' ).requireLibFile
  , Factory = requireLibFile( 'factory.js' ).Factory;
  

test( 'checkFactory', (t) => {
  
  var f = new Factory();
  
  f.register( 'tester', Tester );
  f.create( 'tester', true );
  
  t.end();

  function Tester( v ) {
    t.true( v );
  }
});