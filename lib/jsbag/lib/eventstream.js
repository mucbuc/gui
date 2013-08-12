/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/

if (typeof Set === 'undefined') {
  Set = require( '../lib/set' ).Set;
}

(function(Set){

  function EventQueue() {
  
    var events = [];
  
    this.pushBack = function( e ) {
      events.push( e );
    }; 
  
    this.tryPop = function( popped ) {
      if (events.length) {
        var result = events[0];
        events = events.slice( 1 );
        popped( result );
        return true;
      }
      return false;
    };
  }

  function EventStream() {

    var events = new EventQueue()
      , map = {}
      , instance = this;
  
    this.tick = tick;
  
    this.on = function( event, call ) {
      callsFor( event ).repeats.includeUnique( call );
    };
 
    this.once = function( event, call ) {
      callsFor( event ).singles.includeUnique( call );  
    };
  
    this.removeListener = function( event, call ) {
      var calls = callsFor( event );
      calls.repeats.exclude( call );
      calls.singles.exclude( call );
    };
  
    this.removeAllListeners = function( event ) {
      delete callsFor( event );
    };
  
    this.onTickEmit = function() {
      events.pushBack( arguments );
    };

    function emit( args ) {
      var calls = callsFor( args[0] )
        , repeats = calls.repeats
        , singles = calls.singles
        , m = createMap( args[0] );
    
      repeats.forEach( invoke ); 
      singles.forEach( invoke ); 
      
      repeats.includeSet( m.repeats );
      m.repeats = repeats;

      function invoke( call ) { 
        call( args[1] ); 
      }
    }
  
    function tick() {
      this.tick = function() {};
    
      while( events.tryPop( function( event ) {
        emit( event );
      } ) );
    
      this.tick = tick;
    }
  
    function createMap( event ) {
      
      return map[event] = { 
          singles: new Set(), 
          repeats: new Set(), 
        };
    }
  
    function callsFor() {
      if (!map[arguments[0]]) {
        return createMap(arguments[0]);
      }
      return map[arguments[0]];
    }
  }

  exports.EventQueue = EventQueue;
  exports.EventStream = EventStream;

})(Set);
