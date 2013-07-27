/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
<om636/lib/
*/ 


(function() {
  
  function Vec( x, y ) { 
    this.x = typeof x === 'undefined' ? 0 : x;
    this.y = typeof y === 'undefined' ? 0 : y; 
  }
  
  Vec.prototype = {
  
    add: function( v ) {
      return new Vec( this.x + v.x, this.y + v.y );
    },
    sub: function( v ) {
      return new Vec( this.x - v.x, this.y - v.y );
    },
    scale: function( s ) { 
      return new Vec( this.x * s, this.y * s );
    },
    mult: Vec.scale,
    lengthSquare: function() {
      return this.dot( this ); 
    },
    length: function() {
      return Math.sqrt( this.lengthSquared() ); 
    },
    modulus: Vec.length, 
    normalize: function() {
	  return this.mult( 1 / this.length() );
	  },
	  dot: function( v ) { 
      return this.x * v.x + this.y * v.y;
    },
    determinant: function( v ) {
      return this.x * v.y - this.y * v.x;      
    },
    clone: function() {
      return new Vec( this.x, this.y );
    }
  };
  
  Vec.Zero = new Vec();

  exports.Vec = Vec;

  exports.$V = function( a ) {
    return a instanceof Array ? new Vec( a[0], a[1] ) : Vec.Zero;
  };
  
} )();
  
