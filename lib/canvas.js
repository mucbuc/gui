// DOM dependent 

'use strict'; 

(function(window){

  class Canvas {

    constructor( element ) {
      this.context = element.getContext( '2d' );
      this.width = element.width; 
      this.height = element.width;
      this.bounds = element.getBoundingClientRect();
      this.cache = {};     
    }

    clearCanvas() { 
      this.context.clearRect( 0, 0, width, height ); 
    }

    getContext() { 
      return this.context;    
    } 

    positionOnCanvas( e ) {
      var result; 
      
      if (e.x == undefined || e.y == undefined) {
    	  result = { x: e.pageX, y: e.pageY };
  	  }  
      else {
        result = { x: e.x + window.scrollX, y: e.y + window.scrollY };
      }
      return { x: result.x - bounds.left, y: result.y - bounds.top };
    }

    setDrawTextContext(color, size) {  
      this.context.fillStyle = color;
      this.context.font = size.toString() + 'px Comic sans ms';
      this.context.textBaseline = 'bottom';
    } 

    drawText(x, y, color, text, size, width) {
      this.setDrawTextContext(color, size );
      this.context.fillText(text, x, y, width );
    }

    getTextWidth( text ) {
      if (!this.cache[text]) {
        this.cache[text] = this.context.measureText( text ).width;
      }

      return this.cache[text];
    }
  };

  window.Canvas = Canvas;

})(window);
