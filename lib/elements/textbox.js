/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
<om636/lib/
*/ 


(function(){
  
  function TextBox( controller ) {
    
    var instance = this
      , lines;

    if (typeof controller !== 'undefined') {

      this.offset = new Vec();
    
      Element.call( this, controller );
    
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

      if (this.bounds.right > this.bounds.left) {
        update();
        this.offset.x = this.calcAlignOffset();
      }
    };

    this.pinRight = function( right ) {
      TextBox.prototype.pinRight.call( this, right );
      
      if (this.bounds.right > this.bounds.left) {
        update();
        this.offset.x = this.calcAlignOffset();
      }
    };

    this.pinTop = function( top ) {
      TextBox.prototype.pinTop.call( this, top );
      if (this.bounds.bottom > this.bounds.top) {
        this.offset.y = calcOffsetY( this.bounds.height() );
      }
    };

    this.pinBottom = function( bottom ) {
      TextBox.prototype.pinBottom.call( this, bottom );
      if (this.bounds.bottom > this.bounds.top) {
        this.offset.y = calcOffsetY( this.bounds.height() );
      }
    };

    function calcOffsetY(height) {
      return instance.fontSize + (height - lines.length * instance.fontSize) / 2;
    }

    function render() {
      if (lines) {
        var bounds = instance.bounds.clone();
        lines.forEach( function( line ) {
          Game.canvas.drawText( bounds.left + instance.offset.x, bounds.top + instance.offset.y, instance.color, line, instance.fontSize, false, bounds.width() );
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

			Game.canvas.setDrawTextContext( instance.color, instance.fontSize, false );
    	
      while (words.length) {

        if (!pass) {
          
          var front = words[0]
            , w = Game.canvas.getTextWidth( front );

          if (w > instance.bounds.width()) { 
            var i = front.length;
            while (w > instance.bounds.width()) { 
              front = front.slice( 0, --i );
              w = Game.canvas.getTextWidth( front );
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
          , w = Game.canvas.getTextWidth( test );

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

