/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/

var assert = require( 'assert' )
  , Emitter = require( '../src/emitter' ).Emitter;

assert( Emitter !== 'undefined' );

checkEvents();

function checkEvents() {

  checkOnce();
  checkOn();
  checkAttachWhileTraverse();
  checkDetachWhileTraverse();

  console.log( 'emitter ok' );
}
  

function checkDetachWhileTraverse() {
  var q = new Emitter()
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
  var q = new Emitter()
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

  var q = new Emitter()
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

  var q = new Emitter()
    , counter = 0; 
    
  q.on( 'count', inc ); 
  
  q.emit( 'count' );
  
  q.emit( 'count' );
  
  assert( counter == 2 );
    
  function inc() { 
    ++counter;
  }
}

exports.checkEvents = checkEvents;