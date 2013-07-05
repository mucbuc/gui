/* 
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
      controller.removeListener( 'update', update );
      delete instance;
    } );
    
    controller.on( 'render', render );
    
  	img.src = controller.model;
    
    img.onload = function() {
      controller.on( 'update', update );
      loaded = true;
    };
    
    function update() { 
      if (img.src != controller.model) {
        img.src = controller.model;
        loaded = false;
      }
    }
    
    function render() {
      if (loaded) {
        var bounds = instance.bounds;
        controller.context.drawImage( img, bounds.left, bounds.top, bounds.width(), bounds.height() );
      }
      // console.log( 'render icon' );
    }
  }
  
  Icon.prototype = new Element();
  
  exports.Icon = Icon; 
  
})();