
(function() { 

  function Queue() {
  
    var events = [];
  
    this.pushBack = function(args) {
      events.push( args );
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

  exports.Queue = Queue;

})();

