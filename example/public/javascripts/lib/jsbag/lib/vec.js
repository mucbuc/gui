'use strict';

(function(exports) {
  
  class Vec {

    constructor( x = 0, y = 0 ) { 
      this.x = x;
      this.y = y; 
    }
  
    add( v ) {
      return new Vec( this.x + v.x, this.y + v.y );
    }

    sub( v ) {
      return new Vec( this.x - v.x, this.y - v.y );
    }

    scale( s ) { 
      return new Vec( this.x * s, this.y * s );
    }

    lengthSquare() {
      return this.dot( this ); 
    }

    length() {
      return Math.sqrt( this.lengthSquare() ); 
    }

    normalize() {
	    return this.mult( 1 / this.length() );
	  }

	  dot( v ) { 
      return this.x * v.x + this.y * v.y;
    }

    determinant( v ) {
      return this.x * v.y - this.y * v.x;      
    }

    clone() {
      return new Vec( this.x, this.y );
    }
  };
  
  Vec.Zero = new Vec();

  exports.Vec = Vec;

  exports.$V = function( a ) {
    return a instanceof Array ? new Vec( a[0], a[1] ) : Vec.Zero;
  };
  
})(exports);
  
