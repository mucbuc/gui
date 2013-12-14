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

    this.forEach = function() {
      updateListeners();
      listeners.forEach( function( listener, index, listeners ) {
        listener(arguments);
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