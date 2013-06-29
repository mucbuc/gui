(function(){
  
  function Button( controller ) {
    
    var instance = this;
    Element.call( this, controller );
    
    buildElements();
    
    this.__defineSetter__( 'bounds', function( bounds ) {
      
      var GAP = 0;
      
      for (property in instance.elements) {
        
        if (property == 'box') {
          
          var width = bounds.width();
          
          bounds.diagonal.x *= 0.25;
          
          instance.elements[property].bounds = bounds;
          
          bounds.position.x += bounds.diagonal.x + GAP;
          bounds.diagonal.x = width - bounds.diagonal.x;
        }
        else {
          instance.elements[property].bounds = bounds;
        }
      }
    } );
    
    function buildElements() {
      var builder = new Builder( controller );
      instance.elements = builder.makeElements( instance.factory ).product;
    }
  }
  
  Button.prototype = new Element();
  
  exports.Button = Button;

})();

