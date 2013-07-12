/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
This is the test result for the Unknown Worlds GUIFramework design challenge.
*/ 

var assert = require( 'assert' )
  , lib = require( './config.json' ).lib
  , Factory = require( lib + 'factory' ).Factory
  , Builder = require( lib + 'builder' ).Builder
  , Controller = require( lib + 'controller' ).Controller;
  
assert( Factory !== 'undefined' );
assert( Builder !== 'undefined' ); 

checkBuilder();
  
function checkBuilder() {
  checkEmpty();
  checkSingle();
  //checkObject();
  
  console.log( 'builder ok' );
}

function checkObject() {
  var controller = {
        model: { 'label': 'abc', 'notLabel': 'cde' } }
    , factory = new Factory()
    , builder = new Builder( factory )
    , labeled = false
    , notLabeled = false
    , composite = null;

  factory.register( 'label', Label );
  factory.register( 'notLabel', NoLabel );

  composite = builder.buildComposite( controller );

  assert( labeled && notLabeled );
  assert( composite.label );
  assert( composite.notLabel );

  function Label() {
    labeled = true;
  }

  function NoLabel() {
    notLabeled = true;
  }
}

function checkSingle() {
  var controller = {
        model: { 'Label': 'abc' } }
    , factory = new Factory()
    , builder = new Builder( factory )
    , gotHit = false;
    
  factory.register( 'Label', Label );
  
  builder.buildComposite( controller );
  
  assert( gotHit );
  
  function Label() {
    gotHit = true;
  }
}

function checkEmpty() {
  var controller = { model: {} }
    , factory = new Factory()
    , builder = new Builder( factory )
    , composite = builder.buildComposite( controller );

  assert( !Object.keys( composite ).length );
}
  
exports.checkBuilder = checkBuilder;

