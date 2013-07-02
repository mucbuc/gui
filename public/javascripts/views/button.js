(function(){
  
  function Button( controller ) {
    
    var instance = this
      , _bounds = null;
    View.call( this, controller, instance.factory );
    
    this.__defineSetter__( 'bounds', function( bounds ) {
      this.setBounds( bounds );

      for (component in instance.composite) {
        instance.composite[component].bounds = bounds;
      }
    } );
  }
  
  Button.prototype = new View();
  
  exports.Button = Button;

})();

