/* tester */

var Canvas = function( docElement ) {

  var element = docElement
    , context = 0
    , width = 0 
    , height = 0 
    , bounds = {};

  init();

  function init() {
    if (element && element.getContext) {
      context = element.getContext( '2d' ); 
      width = element.width; 
      height = element.height; 
      bounds = element.getBoundingClientRect(); 
    }
  }; 

  this.clearCanvas = function() { 
    context.clearRect( 0, 0, width, height ); 
  };

  this.getContext = function() { 
    return context;    
  }; 

  this.positionOnCanvas = function( e ) {
    var result; 
    
    if (e.x == undefined || e.y == undefined) {
  	  // firefox
  	  result = { x: e.pageX, y: e.pageY };
	  }  
    else {
      result = { x: e.x + window.scrollX, y: e.y + window.scrollY };
    }
    return { x: result.x - bounds.left, y: result.y - bounds.top };
  };
 
  this.__defineGetter__( 'width', function() {
    return width;
  } );
  
  this.__defineGetter__( 'height', function() {
    return height;
  } );
}; 
