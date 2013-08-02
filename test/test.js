#!/usr/bin/env node

/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
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
  , metaData = require( '../lib.json' ).metaData
  , test = '../test/';

check();

function check() {

  console.log( 'running tests on ' + metaData.VERSION );

//  require( test + 'utils' ).checkUtils;
  require( test + 'factory' ).checkFactory;
  require( test + 'eventstream' ).checkEvents;
  require( test + 'builder' ).checkBuilder;
}
