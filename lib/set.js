/* 
Written by: Mark Busenitz, mbusenitz@gmail.com

objective:
	- manage and access a collection of objects

note: 
	no test about the order of the elements

todo: 
	- handle adding and removing of batches
*/

(function() {

  function Set() {
    var elements = []
      , remove = [];
    
    this.includeUnique = function( element ) {
      if (!this.contains(element)) {
        this.include( element );
        return true;
      }
      return false;
    };
    
    this.include = function( element ) {
      elements.push( element );
    };
    
    this.includeSet = function( s ) {
      s.forEach( function( e ) { 
        elements.push( e );
      } );
    };
  	
    this.contains = function( element ) {
      tick();
  	  return elements.indexOf( element ) != -1;
    };
	
    this.exclude = function( element ) {
      remove.push( element );
    };

    this.clear = function() {
      elements = [];
      remove = [];
    };

    this.forEach = function( f ) {
      tick();
      elements.forEach( f );
    };
    
    this.__defineGetter__( 'length', function() {
      return elements.length - remove.length;
    } );

    function tick() {
      if (remove.length) {
        elements = elements.filter( function( element ) {
          return remove.indexOf( element ) == -1;
        } );
        remove = [];
      }
    }
  }

  exports.Set = Set;

})();

