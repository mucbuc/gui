/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/

if (typeof Queue === 'undefined') {
  Queue = require( './queue' ).Queue;
}

if (typeof Emitter === 'undefined') {
  Emitter = require( './emitter' ).Emitter;
}

(function(Queue, Emitter){

  function Stream() {

    var instance = this
      , queue = new Queue()
      , emit;

    Emitter.call( this );
    emit = instance.emit; 
    
    instance.emit = redirectEmit;

    function redirectEmit( event, args ) {
      instance.emit = function() {
        queue.pushBack( arguments );
      };

      emit( event, args );
      while(queue.tryPop( function(args) {
        emit.apply( null, args );
      } ) );
      instance.emit = redirectEmit;
    }
  }

  Stream.prototype = new Emitter();

  exports.Stream = Stream;

})(Queue, Emitter);
