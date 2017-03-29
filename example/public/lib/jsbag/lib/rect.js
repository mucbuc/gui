/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
*/ 

if (typeof(sign) === 'undefined') {
   require( '../lib/core.js' )
}

(function(){

  function Rect( p, d ) {
    
    if (typeof p !== 'undefined') {
      this.left = p.x;
      this.top = p.y;
    }
    else {
      this.left = 0;
      this.top = 0;
    }

    if (typeof d !== 'undefined') {
      this.right = this.left + Math.abs( d.x );
      this.bottom = this.top + Math.abs( d.y );
    }
    else {
      this.right = 0;
      this.bottom = 0;
    }
  }
  
  Rect.prototype = {
    
    width: function() {
      return Math.abs( this.right - this.left );
    },
    height: function() {
      return Math.abs( this.bottom - this.top );
    },
    isIntersecting: function( vec ) {
      return vec.x >= this.left 
          && vec.x <= this.right 
          && vec.y >= this.top
          && vec.y <= this.bottom;
    },
    clone: function() {
      var p = new Vec( this.left, this.top )
        , d = new Vec( this.width(), this.height() );

      return new Rect( p, d );
    }
  };
  
  exports.Rect = Rect;
  
} )();
