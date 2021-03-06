/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
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
        controller.emit( 'guiTouch' );
      }
    }
    
    function mouseUp( vec ) {
      if (instance.bounds.isIntersecting( vec )) {
        if (typeof(fire) === 'function' ) {
          fire();
        }
        else {
          controller.emit( controller.model );
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