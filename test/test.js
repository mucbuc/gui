#!/usr/bin/env node

/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
<om636/lib/

objective: 
	- main test module
	
status: 
	- current implementation does its checks by running the code and calling assertions

todo: 
	- logging: "pretty" string on fail 
	- confirmation: which/how many test passed
*/ 

var assert = require( 'assert' )
  , app = require( '../public/javascripts/app' ).app
  , test = '../test/';

app.init();

check();

function check() {

  console.log( 'running tests on ' + app.metaData.NAME + ' ' + app.metaData.VERSION );

//  require( test + 'utils' ).checkUtils;
  require( test + 'factory' ).checkFactory;
  require( test + 'eventstream' ).checkEvents;
  require( test + 'builder' ).checkBuilder;
}
