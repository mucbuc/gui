/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
<om636/lib/

objective: 
  render image 
  handle image loading 
*/ 

(function(){

  function Icon( controller ) {

    var img = new Image()
	  , instance = this
    , loaded = false;
	  
	  Element.call( this, controller );  

    controller.once( 'unload', function() {
      controller.removeListener( 'render', render );
      delete instance;
    } );
    
    controller.on( 'render', render );
    
  	img.src = controller.model;
    
    img.onload = function() {
      loaded = true;
      
      if (instance.onload) {
        instance.onload( img );
      }
    };
    
    function render() {
      if (loaded) {
        var bounds = instance.bounds;
        controller.context.drawImage( img, bounds.left, bounds.top, bounds.width(), bounds.height() );
      }
    }
  }
  
  Icon.prototype = new Element();
  
  exports.Icon = Icon; 
  
})();