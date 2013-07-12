/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
This is the test result for the Unknown Worlds GUIFramework design challenge.

objective: 
	render text
  set elmement width to text width
*/ 

(function(){

  function Label( controller ) {
    
    var instance = this
      , model
      , width = 0;

    if (typeof controller !== 'undefined') {
      
      this.offset = new Vec(); 

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
    }

    this.pinLeft = function( left ) {
      Label.prototype.pinLeft.call( this, left );
      if (this.bounds.right > this.bounds.left)  {
        this.offset.x = this.calcAlignOffset();
      }
    };

    this.pinRight = function( right ) {
      Label.prototype.pinRight.call( this, right );
      if (this.bounds.right > this.bounds.left) {
        this.offset.x = this.calcAlignOffset();
      }
    };

    this.pinTop = function( top ) {
      Label.prototype.pinTop.call( this, top );
      if (this.bounds.bottom > this.bounds.top) {
        this.offset.y = calcOffsetY( this.bounds.height() );
      }
    };  

    this.pinBottom = function( bottom ) {
      Label.prototype.pinBottom.call( this, bottom );
      if (this.bounds.bottom > this.bounds.top) {
        this.offset.y = calcOffsetY( this.bounds.height() );
      }
    };  

    this.floatRight = function( left ) {
      Label.prototype.pinRight.call( this, left );
      Label.prototype.pinLeft.call( this, left + width );
      return width;
    };

    this.floatDown = function( top ) {
      Label.prototype.pinTop.call( this, top );
      Label.prototype.pinBottom.call( this, top + this.floatHeight );
      this.offset.y = calcOffsetY( this.floatHeight );
      return this.floatHeight;
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
  Label.prototype.floatHeight = Label.prototype.fontSize * 2;
  Label.prototype.color = "rgb(0, 0, 130)";
  
  exports.Label = Label;

})();