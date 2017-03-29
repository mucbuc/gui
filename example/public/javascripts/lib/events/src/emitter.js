/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/

if (typeof Batch === 'undefined') {
  Batch = require( './batch' ).Batch;
}

(function(Batch){

  function Emitter() {

    var map = {};
    
    this.on = function( event, call ) {
      addListener( 'repeat', event, call );
    };
 
    this.once = function( event, call ) {
      addListener( 'singles', event, call );
    };
  
    this.removeListener = function( event, call ) {
      for (var batch in map[event])
        map[event][batch].exclude( call );
    };
  
    this.removeAllListeners = function( event ) {
      if (typeof event === 'undefined')
        for (var key in map)
          clearBatches( map[key] );
      else
        clearBatches( map[event] );
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

    function clearBatches( batches ) {
      for (var batch in batches)         
        batches[batch].excludeAll();
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

      batch.include( call );
    }
  }

  exports.Emitter = Emitter;

})(Batch);
