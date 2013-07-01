(function(){
  
  function Button( controller ) {
    
    var instance = this
      , _bounds = null;
    View.call( this, controller, instance.factory );
    
    this.__defineSetter__( 'bounds', function( bounds ) {
      this.setBounds( bounds );

      for (component in instance.composite) {
        if (component == 'box') {
          var width = bounds.width();
          bounds.diagonal.x *= 0.25;
          instance.composite[component].bounds = bounds;
          bounds.position.x += bounds.diagonal.x;
          bounds.diagonal.x = width - bounds.diagonal.x;
        }
        else {
          instance.composite[component].bounds = bounds;
        }
      }
    } );
  }
  
  Button.prototype = new View();
  
  exports.Button = Button;

})();

