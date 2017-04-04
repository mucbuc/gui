'use strict';

(function(exports){

  class Rect {

    constructor( topLeft = { x: 0, y: 0 }, size = { x: 0, y: 0 } ) {
      this.left = topLeft.x;
      this.top = topLeft.y; 
      this.right = this.left + Math.abs( size.x );
      this.bottom = this.top + Math.abs( size.y );
    };
  
    width() {
      return Math.abs( this.right - this.left );
    }

    height() {
      return Math.abs( this.bottom - this.top );
    }

    isIntersecting( vec ) {
      return vec.x >= this.left 
          && vec.x <= this.right 
          && vec.y >= this.top
          && vec.y <= this.bottom;
    }

    clone() {
      const topLeft = new Vec( this.left, this.top )
        , size = new Vec( this.width(), this.height() );
      return new Rect( topLeft, size );
    }
  };
  
  exports.Rect = Rect;
  
})(exports);
