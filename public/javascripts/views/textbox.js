(function(){
  
  function TextBox( controller ) {
    
    var instance = this
      , lines;
    
    //View.call( this, controller, instance.factory );
  
    this.width = 100;

    controller.on( 'update', update ); 

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
      console.log( lines );
    }
  }

  TextBox.prototype.fontSize = 20;
  TextBox.prototype.color = "rgb(0, 0, 130)";

  exports.TextBox = TextBox;

})();

