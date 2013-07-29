#!/usr/bin/env node

/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
*/ 

var assert = require( 'assert' )
  , package = require( '../package.json' )
  , test = '../test/';

check();

function check() {

  console.log( 'running tests on ' + package.name + ' ' + package.version );
  
  require( test + 'set' );
}
