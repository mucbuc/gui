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
      context.clearRect( 0, 0, width, height ); 
    }

    getContext() { 
      return context;    
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
      context.fillStyle = color;
      context.font = size.toString() + 'px Comic sans ms';
      context.textBaseline = 'bottom';
    } 

    drawText(x, y, color, text, size, width) {
      setDrawTextContext(color, size );
      context.fillText(text, x, y, width );
    }

    getTextWidth( text ) {
      if (!cache[text]) {
        cache[text] = context.measureText( text ).width;
      }

      return cache[text];
    }
  };

  window.Canvas = Canvas;

})(window);
