/* 
objective: 
  render image 
  handle image loading 
*/ 

(function(){

  function Icon( controller ) {

    var img = new Image()
	  , instance = this;
	  
	Element.call( this, controller );  

    controller.once( 'unload', function() {
      controller.removeListener( 'render', render );
      controller.removeListener( 'update', update );
      delete instance;
    } );
    
	img.src = controller.model;
    img.onload = function() {
      controller.on( 'render', render );
      controller.on( 'update', update );
    };
    
    function update() { 
      if (img.src != controller.model) {
        img.src = controller.model;
      }
    }
    
    function render() {
      var bounds = instance.bounds;
      controller.context.drawImage( img, bounds.left, bounds.top, bounds.width(), bounds.height() );
    }
  }
  
  Icon.prototype = new Element();
  
  exports.Icon = Icon; 
  
})();