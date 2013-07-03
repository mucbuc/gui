/* 
objective: 
	render text
  set elmement width to text width
*/ 

(function(){

  function Label( controller ) {
    
    var instance = this
      , model
      , width = 0
      , align = ''
      , offset = 0
      , aligned = false;
    
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

    function alignOffset( left ) {
      switch (controller.context.textAlign) {
        case 'center':
          offset = instance.bounds.width() * 0.5;
          break;
        case 'right': 
          offset = instance.bounds.width();
          break;
        case 'left':
        default:
          offset = 0;
      }
      aligned = true;
    }

    // callbacks
    function update() {
      model = controller.model;
      if (model && model.length) {
        SetDrawTextContext( instance.color, instance.fontSize, false );
        width = getTextWidth( model, controller.context );
        align = controller.context.textAlign;
        aligned = false;
      }
    } 
    function render() {
      var bounds = instance.bounds;
      
      if (!aligned) {
        alignOffset();
      }
    
      DrawText( bounds.left + offset, bounds.top, instance.color, model, instance.fontSize, false, width );
    }      
  }
  
  Label.prototype = new Element();
  Label.prototype.fontSize = 20;
  Label.prototype.color = "rgb(0, 0, 130)";
  
  exports.Label = Label;

})();