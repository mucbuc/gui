/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/

var assert = require( 'assert' )
  , path = require( 'path' )
  , events = require( '../src/eventstream' )
  , EventStream = events.EventStream;

assert( EventStream !== 'undefined' );

checkEvents();

function checkEvents() {

  checkOnce();
  checkOn();
  //checkStream();
  checkAttachWhileTraverse();
  checkDetachWhileTraverse();

  console.log( 'events ok' );
}

function checkDetachWhileTraverse() {
  var q = new EventStream()
    , counter = 0;
  
  q.once( 'check', tickIt );
  q.on( 'check', tickIt );
  
  q.once( 'pop', popIt );
  
  q.emit( 'pop' );
  q.emit( 'check' );
  
  assert( counter == 0 );

  q.on( 'break', breakIt );
  q.on( 'break', tickIt );
  q.emit( 'break' );
  q.emit( 'break' );
  
  assert( counter == 0 );

  function breakIt() {
    q.removeListener( 'break', tickIt );
  }
  function popIt() {
    q.removeListener( 'check', tickIt );
  }
  
  function tickIt() {
    console.log( 'tickIt' );
    ++counter;
  }
}

function checkAttachWhileTraverse() {
  var q = new EventStream()
    , counter = 0;
  
  q.once( 'push', pushIt );
  q.emit( 'push' );
  
  assert( counter == 1 );
  
  q.emit( 'push' );
  
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
  
  q.emit( 'flip' );
  
  assert( flipped == true );
  
  q.emit( 'flip' );
  
  assert( flipped == true );
  
  function flipIt() {
    flipped = !flipped; 
  }
}

function checkOn() {

  var q = new EventStream()
    , counter = 0; 
    
  q.on( 'count', inc ); 
  
  q.emit( 'count' );
  
  q.emit( 'count' );
  
  assert( counter == 2 );
    
  function inc() { 
    ++counter;
  }
}

function checkStream() {
  
  var q = new EventStream()
    , responded = false
    , interupted = false;
  
  q.on( 'test1', response );
  q.emit( 'test1' );
  
  function response() {
    q.on( 'test2', interupt );
    q.emit( 'test2' );
    responded = true;
  }

  function interupt() {
    assert( responded );
    interupted = true;
  }
  
  assert( interupted );
}

exports.checkEvents = checkEvents;