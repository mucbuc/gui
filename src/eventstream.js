/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/

(function(){

  var assert = require( 'assert' )
    , Batch = require( './batch' ).Batch;

  function EventStream() {

    var map = {};
    
    this.on = function( event, call ) {
      addListener( 'repeat', event, call );
    };
 
    this.once = function( event, call ) {
      addListener( 'singles', event, call );
    };
  
    this.removeListener = function( event, call ) {
      var batches = map[event]; 
      if (batches) {
        var repeat = batches.repeat
          , singles = batches.singles;

        if (repeat) 
          repeat.exclude( call );
        if (singles)
          singles.exclude( call );
      }
    };
  
    this.removeAllListeners = function( event ) {
      if (typeof event === 'undefined')
        for (var key in map)
          clearBatches( map[key] );
      else
        clearBatches( event );
    };
  
    this.emit = function( event, args ) {
      var batches = map[event]; 
      if (batches) {
        if (batches.repeat)
          batches.repeat.forEach( args );
        if (batches.singles) {
          var singles = batches.singles; 
          batches.singles = new Batch(); 
          singles.forEach( args );
        }
      }
    };

    function clearBatches( event ) {
      var batches = map[event];
      if (batches) {
        if (batches.repeat)
          batches.repeat.excludeAll();
        if (batches.singles)
          batches.singles.excludeAll();
      }
    }

    function addListener( batchName, event, call ) { 
      var batches = map[event]
        , batch;
      if (!batches) {
        batch = new Batch();
        batches = {};
        batches[batchName] = batch;
        map[event] = batches;
      }
      else {
        batch = batches[batchName];

        if (!batch) {
          batch = new Batch();
          batches[batchName] = batch;
        }
      }

      assert( typeof batch !== 'undefined' ); 

      batch.include( call );
    }
  }

  exports.EventStream = EventStream;

})();
