(function(){

  function Frame( controller ) {

    var instance = this;
    Element.call( this, controller );
    
    controller.once( 'unload', function() {
      controller.removeListener( 'render', render );
    } );
    
    controller.on( 'render', render );
  
    function render() {
      var bounds = instance.bounds;
      DrawRect(bounds.left, bounds.top, bounds.width(), bounds.height(), false, instance.color );
    };
  }
  
  Frame.prototype = new Element();
  Frame.prototype.color = "rgb(80, 100, 90)";
  
  exports.Frame = Frame;

})();