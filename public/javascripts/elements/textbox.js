(function(){
  
  function TextBox( controller ) {
    
    var instance = this
      , lines;
    
    Label.call( this, controller );
    
    if (typeof controller !== 'undefined') {

      this.width = 100;

      controller.once( 'unload', function() {
        controller.removeListener( 'update', update ); 
        controller.removeListener( 'render', render ); 
      });
      controller.on( 'update', update ); 
      controller.on( 'render', render );
    }

    function render() {
      if (lines) {

        var bounds = instance.bounds.clone();
        lines.forEach( function( line ) {
          DrawText( bounds.left, bounds.top, instance.color, line, instance.fontSize, false, instance.width );
          bounds.top += instance.fontSize;
        });
      }
    } 

    function update() {

    	var words = controller.model.split( ' ' )
    	  , lineWidth = 0
        , pass = '';

      lines = [];

			SetDrawTextContext( instance.color, instance.fontSize, false );
    	
      while (words.length) {

        if (!pass) {
          
          var front = words[0]
            , w = getTextWidth( front, controller.context );

          if (w > instance.width) { 
            var i = front.length;
            while (w > instance.width) { 
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

          if (lineWidth + w < instance.width) {
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

  TextBox.prototype = new Label();

  exports.TextBox = TextBox;

})();

