/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
This is the result for the Unknown Worlds GUIFramework design test.
*/ 


(function(){

  function ClickRect( controller, fire ) {
   
    var instance = this;
   
    Element.call( this, controller );
    
    if (typeof controller !== 'undefined') {
    
      controller.once( 'unload', function() {
        controller.removeListener( 'mouseDown', mouseDown );
        controller.removeListener( 'mouseUp', mouseUp );
      } ); 
    
      controller.on( 'mouseDown', mouseDown );
    }
    
    function mouseDown( vec ) {
      if (instance.bounds.isIntersecting( vec )) {
        controller.once( 'mouseUp', mouseUp );
        controller.onTickEmit( 'guiTouch' );
      }
    }
    
    function mouseUp( vec ) {
      if (instance.bounds.isIntersecting( vec )) {
        if (typeof(fire) === 'function' ) {
          fire();
        }
        else {
          controller.onTickEmit( controller.model );
        }
        if (controller.click) {
          controller.click.play();
        }
      }
    }
  }
  
  ClickRect.prototype = new Element();
  
  exports.ClickRect = ClickRect;
  
})();