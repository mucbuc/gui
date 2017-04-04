(function(){

  function Batch() {
    
    var instance = this
      , listeners = [];

    this.include = function( listener ) {
      listeners.push( listener );
    };

    this.exclude = function( listener ) {
      var index = listeners.indexOf( listener );
      if (index != -1) 
        listeners[index] = stub;
    };

    this.excludeAll = function() {
      listeners.forEach( function( listener ) {
        listener = stub();
      } );
    };

    this.forEach = function(args) {
      updateListeners();
      listeners.forEach( function( listener ) {
        listener(args);
      } );
    }; 

    function updateListeners() {
      listeners = listeners.filter( function( listener ) {
        return listener !== stub;
      } );
    }

    function stub() {}
  }

  exports.Batch = Batch;

})();