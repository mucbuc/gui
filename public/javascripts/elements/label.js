/* 
objective: 
	render text
  set elmement width to text width
*/ 

(function(){

  function Label( controller ) {
    
    var instance = this
      , model
      , width = 0;

    this.offset = new Vec(); 

    this.floatHeight = 80;

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

    this.pinLeft = function( left ) {
      Label.prototype.pinLeft.call( this, left );

      if (this.bounds.width() > 0) {
        this.offset.x = this.calcAlignOffset();
      }
    };

    this.pinRight = function( right ) {
      Label.prototype.pinRight.call( this, right );
      
      if (this.bounds.width() > 0) {
        this.offset.x = this.calcAlignOffset();
      }
    };

    this.pinTop = function( top ) {
      Label.prototype.pinTop.call( this, top );
      if (this.bounds.height() > 0) {
        this.offset.y = calcOffsetY( this.bounds.height() );
      }
    };  

    this.pinBottom = function( bottom ) {
      Label.prototype.pinBottom.call( this, bottom );
      if (this.bounds.height() > 0) {
        this.offset.y = calcOffsetY( this.bounds.height() );
      }
    };  

    this.fillDown = function( top, height ) {
      Label.prototype.fillDown.call( this, top, height );
      this.offset.y = calcOffsetY( height );
    };

    this.fillRight = function( left, width ) {
      Label.prototype.fillRight.call( this, left, width );
      this.offset.x = this.calcAlignOffset();
    };

    this.floatRight = function( left ) {
      Label.prototype.pinLeft.call( this, left );
      Label.prototype.pinRight.call( this, left + width )
      this.offset.x = this.calcAlignOffset();
      return width;
    };

    this.floatDown = function( top, height ) {
      Label.prototype.pinTop.call( this, top );
      Label.prototype.pinBottom.call( this, top + height );
      this.offset.y = calcOffsetY( height );
      return height;
    };

    function calcOffsetY( height ) {
      return (height - instance.fontSize) / 2;
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
      DrawText( bounds.left + instance.offset.x, bounds.bottom - instance.offset.y, instance.color, model, instance.fontSize, false, width );
    }
  }
  
  Label.prototype = new Element();
  Label.prototype.fontSize = 20;
  Label.prototype.color = "rgb(0, 0, 130)";
  
  exports.Label = Label;

})();