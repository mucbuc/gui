/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/

(function(){

 
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
          singles: new Array(), 
          repeats: new Array(), 
        };
    }
  
    function callsFor() {
      if (!map[arguments[0]]) {
        return createMap(arguments[0]);
      }
      return map[arguments[0]];
    }
  }

  exports.EventStream = EventStream;

})();
