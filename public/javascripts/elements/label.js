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
      , offset = 0; 

    Element.call( this, controller );

    if (typeof controller !== 'undefined') {
      
      // set model 
      update();
      
      // listeners
      controller.once( 'unload', function() { 
        controller.removeListener( 'render', render );
        controller.removeListener( 'update', update );
      } );
      controller.on( 'render', render );
      controller.on( 'update', update );
    }

    this.layoutVertical = function( top ) {
      offset = calcAlignOffset();
      return Label.prototype.layoutVertical.call( this, top ); 
    };

    this.layoutHorizontal = function( left ) {
      offset = calcAlignOffset();
      return Label.prototype.layoutHorizontal.call( this, left );    
    };

    function calcAlignOffset() {
      switch (controller.context.textAlign) {
        case 'center':
          return instance.bounds.width() * 0.5;
        case 'right': 
          return instance.bounds.width();
      }
      return 0;
    }

    function update() {
      model = controller.model;
      if (model && model.length) {
        SetDrawTextContext( instance.color, instance.fontSize, false );
        width = getTextWidth( model, controller.context );
      }
    }
  
    function render() {
      var bounds = instance.bounds;
      DrawText( bounds.left + offset, bounds.top, instance.color, model, instance.fontSize, false, width );
    }      
  }
  
  Label.prototype = new Element();
  Label.prototype.fontSize = 20;
  Label.prototype.color = "rgb(0, 0, 130)";
  
  exports.Label = Label;

})();