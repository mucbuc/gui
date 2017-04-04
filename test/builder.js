#!/usr/bin/env node

const test = require( 'tape' )
  , requireLibFile = require( './base' ).requireLibFile
  , Factory = requireLibFile( 'factory' ).Factory
  , Builder = requireLibFile( 'builder' ).Builder
  , Controller = requireLibFile( 'controller' ).Controller;

test( 'checkObject', (t) => {
  var factory = new Factory()
    , builder = new Builder( factory )
    , labeled = false
    , notLabeled = false
    , composite = null;

  factory.register( 'label', Label );
  factory.register( 'notLabel', NoLabel );

  t.plan( 4 );

  composite = builder.buildComposite( { model: { 'label': 'abc', 'notLabel': 'cde' } } );

  t.true( composite.hasOwnProperty('label') );
  t.true( composite.hasOwnProperty('notLabel') );
  t.end();

  function Label() {
    t.pass();
  }

  function NoLabel() {
    t.pass();
  }
});

test( 'checkSingle', (t) => {
  const factory = new Factory()
    , builder = new Builder( factory );
    
  factory.register( 'Label', Label );

  builder.buildComposite( { model: { 'Label': 'abc' } } );
  
  function Label() {
    t.pass();
    t.end();
  }
});

test( 'checkEmpty', (t) => {
  
  const factory = new Factory()
    , builder = new Builder( factory )
    , composite = builder.buildComposite( { model: {} } );

  t.equal( Object.keys( composite ).length, 0 );
  t.end();
});
