
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





/*
 function Batch() {
    
    var listeners = new Array();

    this.exclude = function( listener ) {
      var index = listeners.indexOf( listener );
      if (index != -1) {
        listeners[index] = stub;
      }
    };

    this.purge = function() {
      listeners = listeners.filter( function( elem ) {
        return elem !== stub;
      } );
    };

    this.include = function( elem ) {
      listeners.push( elem );
    };

    this.forEach = listeners.forEach; 

    function stub() {}
  }
*/