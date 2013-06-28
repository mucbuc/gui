var assert = require( 'assert' )
  , lib = require( './config.json' ).lib
  , Factory = require( lib + 'factory' ).Factory
  , Builder = require( lib + 'builder' ).Builder
  , Controller = require( lib + 'controller' ).Controller;
  
assert( Factory != undefined );
assert( Builder != undefined ); 

checkBuilder();
  
function checkBuilder() {
  checkEmpty();
  checkSingle();
  checkComposite();
  
  console.log( 'builder ok' );
}

function checkComposite() {
  var controller = {
        model: { 'label': 'abc', 'notLabel': 'cde' } }
    , factory = new Factory()
    , builder = new Builder( controller )
    , labeled = false
    , notLabeled = false
    , elements = 0;

  factory.register( 'label', Label );
  factory.register( 'notLabel', NoLabel );

  elements = builder.makeElements( factory ).product;

  assert( labeled && notLabeled );
  assert( elements.label );
  assert( elements.notLabel );

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
    , builder = new Builder( controller )
    , gotHit = false;
    
  factory.register( 'Label', Label );
  
  builder.makeElements( factory );
  
  assert( gotHit );
  
  function Label() {
    gotHit = true;
  }
}

function checkEmpty() {
  var controller = { model: {} }
    , factory = new Factory()
    , builder = new Builder( controller );
  
  builder.makeElements( factory );

  assert( !Object.keys( builder.product ).length );
}
  
exports.checkBuilder = checkBuilder;

