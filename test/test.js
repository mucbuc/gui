#!/usr/bin/env node

/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
*/ 

var package = require( '../package.json' )
  , cp = require( 'child_process' ); 

check();

function check() {

  console.log( 'running tests on ' + package.name + ' ' + package.version );

  cp.fork( './vec' );
  cp.fork( './rect' );
}
