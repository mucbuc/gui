var assert = require( 'assert' )
  , lib = require( './config.json' ).lib
  , Set = require( lib + 'set' ).Set
  , events = require( lib + 'eventstream' )
  , EventQueue = events.EventQueue
  , EventStream = events.EventStream;

assert( Set != undefined );
assert( EventQueue != undefined );
assert( EventStream != undefined );

checkEvents();

function checkEvents() {

  checkOnce();
  checkOn();
  checkStream();
  checkQueuePop(); 
  checkAttachWhileTraverse();
  checkDetachWhileTraverse();

  console.log( 'events ok' );
}

function checkDetachWhileTraverse() {
  var q = new EventStream( Set )
    , counter = 0;
  
  q.once( 'check', tickIt );
  q.on( 'check', tickIt );
  
  q.once( 'pop', popIt );
  
  q.onTickEmit( 'pop' );
  q.onTickEmit( 'check' );
  q.tick();
 
  assert( counter == 0 );
 
  function popIt() {
    q.removeListener( 'check', tickIt );
  }
  
  function tickIt() {
    ++counter;
  }
}

function checkAttachWhileTraverse() {
  var q = new EventStream( Set )
    , counter = 0;
  
  q.once( 'push', pushIt );
  q.onTickEmit( 'push' );
  q.tick();
 
  assert( counter == 1 );
  
  q.onTickEmit( 'push' );
  q.tick();
  
  assert( counter == 2 );
 
  function pushIt() {
    ++counter;
    q.once( 'push', tickIt );
  }
  
  function tickIt() {
    ++counter;
  }
}

function checkOnce() {

  var q = new EventStream()
    , flipped = false;

  q.once( 'flip', flipIt );
  
  q.onTickEmit( 'flip' );
  q.tick();
  
  assert( flipped == true );
  
  q.onTickEmit( 'flip' );
  q.tick();
  
  assert( flipped == true );
  
  function flipIt() {
    flipped = !flipped; 
  }
}

function checkOn() {

  var q = new EventStream( Set )
    , counter = 0; 
    
  q.on( 'count', inc ); 
  
  q.onTickEmit( 'count' );
  q.tick();
  
  q.onTickEmit( 'count' );
  q.tick();
  
  assert( counter == 2 );
    
  function inc() { 
    ++counter;
  }
}

function checkQueuePop() {
  
  var q = new EventQueue()
    , gotPopped = false
    , val = 342;
  
  q.pushBack( val ); 
  
  assert( q.tryPop( function( v ) {
    assert( v == val );
    gotPopped = true;
  } ) );
  
  assert( gotPopped );
  
  assert( !q.tryPop() );
}

function checkStream() {
  
  var q = new EventStream( Set )
    , responded = false
    , interupted = false;
  
  q.on( 'test1', response );
  q.onTickEmit( 'test1' );
  q.tick();
  
  function response() {
    q.on( 'test2', interupt );
    q.onTickEmit( 'test2' );
    q.tick();
    responded = true;
  }

  function interupt() {
    assert( responded );
    interupted = true;
  }
  
  assert( interupted );
}

function loadSet() {
  require( lib + 'set' );
  return Set;
}

exports.checkEvents = checkEvents;