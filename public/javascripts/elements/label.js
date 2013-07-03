/* 
objective: 
	render text (one line, squeezed) 
	cache model
*/ 

(function(){

  function Label( controller ) {
    
    var instance = this
      , model
      , width = 0;
    
    Element.call( this, controller );

    // set model 
    update();
    
    // listeners
    controller.once( 'unload', function() { 
      controller.removeListener( 'render', render );
      controller.removeListener( 'update', update );
    } );
    controller.on( 'render', render );
    controller.on( 'update', update );
    
    // callbacks
    function update() {
      model = controller.model;
      SetDrawTextContext( instance.color, instance.fontSize, false );
      width = getTextWidth( model, controller.context );
    } 
    function render() {
      var bounds = instance.bounds;
      DrawText( bounds.left, bounds.bottom, instance.color, model, instance.fontSize, false, width );
    }      
  }
  
  Label.prototype = new Element();
  Label.prototype.fontSize = 20;
  Label.prototype.color = "rgb(0, 0, 130)";
  
  exports.Label = Label;

})();