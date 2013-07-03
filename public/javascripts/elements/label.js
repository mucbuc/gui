/* 
objective: 
	render text (one line, squeezed) 
	cache model
*/ 

(function(){

  function Label( controller ) {
    
    var instance = this
      , model = controller.model;
    
    Element.call( this, controller );
    
    controller.once( 'unload', function() { 
      controller.removeListener( 'render', render );
      controller.removeListener( 'update', update );
    } );
    
    controller.on( 'render', render );
    controller.on( 'update', update );
    
    function update() {
      model = controller.model;
    } 
    
    function render() {
      var bounds = instance.bounds;
      DrawText( bounds.left, bounds.bottom, instance.color, model, instance.fontSize, false);
    }      
  }
  
  Label.prototype = new Element();
  Label.prototype.fontSize = 20;
  Label.prototype.color = "rgb(0, 0, 130)";
  
  exports.Label = Label;

})();