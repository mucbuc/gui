
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


