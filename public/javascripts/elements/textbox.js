(function(){
  
  function TextBox( controller ) {
    
    var instance = this
      , lines;

    this.offset = new Vec();
    
    Element.call( this, controller );
    
    if (typeof controller !== 'undefined') {

      update();

      controller.once( 'unload', function() {
        controller.removeListener( 'update', update );
        controller.removeListener( 'render', render ); 
      });
      controller.on( 'update', update ); 
      controller.on( 'render', render );
    }

    this.pinLeft = function( left ) {
      TextBox.prototype.pinLeft.call( this, left );

      if (this.bounds.width()) {
        update();
      }
    };

    this.pinRight = function( right ) {
      TextBox.prototype.pinRight.call( this, right );
      update();
    };

    this.pinTop = function( top ) {
      TextBox.prototype.pinTop.call( this, top );
      update();
      this.offset.y = calcOffsetY( this.bounds.height() );
    };

    this.pinBottom = function( bottom ) {
      TextBox.prototype.pinBottom.call( this, bottom );
      update();
      this.offset.y = calcOffsetY( this.bounds.height() );
    };

/*
    this.fillDown = function( top, height ) {

      TextBox.prototype.fillDown.call( this, top, height ); 
      if (!lines && this.bounds.width() > 0) {
        update();
      }
      this.offset.y = calcOffsetY( height );
    };

    this.fillUp = function( bottom, height ) {
      TextBox.prototype.fillUp.call( this, bottom, height ); 
      this.offset.y = -calcOffsetY( height );
    };

    this.fillRight = function( left, width ) {
      TextBox.prototype.fillRight.call( this, left, width );    
      this.offset.x = this.calcAlignOffset();
    };

    this.fillLeft = function( right, width ) {
      TextBox.prototype.fillLeft.call( this, right, width );
      this.offset.x = this.calcAlignOffset();
    };

    this.floatDown = function( top ) {
      var height = lines.length * instance.fontSize;
      this.pinTop( top );
      this.pinBottom( top + height );
      return height; 
    };

    this.floatUp = function( bottom ) {
      var height = lines.length * instance.fontSize;
      this.pinBottom( bottom );
      this.pinTop( bottom - height );
      return height;
    };

*/

/*
    this.layoutDown = function( top ) {
      this.offset.y = this.fontSize + (this.bounds.height() - lines.length * this.fontSize) / 2;
      return TextBox.prototype.layoutDown.call( this, top ); 
    };

    this.layoutRight = function( left ) {
      this.offset.x = this.calcAlignOffset();
      return TextBox.prototype.layoutRight.call( this, left );    
    };

    this.fillDown = function( top, height ) {
      this.offset.y = this.fontSize + (height - lines.length * this.fontSize) / 2;
      return TextBox.prototype.fillDown.call( this, top, height ); 
    };

    this.fillRight = function( left, width ) {
      this.offset.x = this.calcAlignOffset();
      return TextBox.prototype.fillRight.call( this, left, width );    
    };
*/

    function calcOffsetY(height) {
      return instance.fontSize + (height - lines.length * instance.fontSize) / 2;
    }

    function render() {
      if (lines) {
        var bounds = instance.bounds.clone();
        lines.forEach( function( line ) {
          DrawText( bounds.left + instance.offset.x, bounds.top + instance.offset.y, instance.color, line, instance.fontSize, false, bounds.width() );
          bounds.top += instance.fontSize;
        });
      }
    }; 

    function update() {

      if (!instance.bounds.width())
        return;

    	var words = controller.model.split( ' ' )
    	  , lineWidth = 0
        , pass = '';

      lines = [];

			SetDrawTextContext( instance.color, instance.fontSize, false );
    	
      while (words.length) {

        if (!pass) {
          
          var front = words[0]
            , w = getTextWidth( front, controller.context );

          if (w > instance.bounds.width()) { 
            var i = front.length;
            while (w > instance.bounds.width()) { 
              front = front.slice( 0, --i );
              w = getTextWidth( front, controller.context );
            }
            lines.push( front );
            words[0] = words[0].slice(i);
          }
          else {
            pass = front;
            lineWidth = w;
            words = words.slice(1);
          }
        }
        else {
          var test = ' ' + words[0]
          , w = getTextWidth( test, controller.context );

          if (lineWidth + w < instance.bounds.width()) {
      			pass += test;
            lineWidth += w;
            words = words.slice(1);
          }
      		else {
      		  lines.push( pass );
            pass = '';
            lineWidth = 0;
          }
        }
      }
    
      lines.push( pass );
    }
  }

  TextBox.prototype = new Element();
  TextBox.prototype.fontSize = 20;
  TextBox.prototype.color = "rgb(0, 0, 130)";

  exports.TextBox = TextBox;

})();

