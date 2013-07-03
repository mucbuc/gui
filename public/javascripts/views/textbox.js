(function(){
  
  function TextBox( controller ) {
    
    var instance = this
      , lines = [];
    
    //View.call( this, controller, instance.factory );
  
    this.width = 100;

    controller.on( 'update', update ); 

    function update() {

    	var words = controller.model.split( ' ' )
    	  , lines = ['']
    	  , back = ''
    	  , lineWidth = 0;

			SetDrawTextContext( instance.color, instance.fontSize, false );
    	while (words.length) {
    		var test = lines[lines.length - 1] + words[0];

    		lineWidth =+ getTextWidth( test, controller.context );

    		if (lineWidth < 100) {
    			lines[lines.length - 1] = test;
    			words = words.slice(1);
    		}
    		else {
    			lines.push( '' );
    			lineWidth = 0;
    		}
    	}
    
    	console.log( lines );
    }
  }

  TextBox.prototype.fontSize = 20;
  TextBox.prototype.color = "rgb(0, 0, 130)";

  exports.TextBox = TextBox;

})();

