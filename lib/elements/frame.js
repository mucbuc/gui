/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/


(function(){

  function Frame( controller ) {

    var instance = this;

    if (typeof controller !== 'undefined') {
      Element.call( this, controller );

      controller.once( 'unload', function() {
        controller.removeListener( 'render', render );
      } );
      
      controller.on( 'render', render );
    }

    this.render = function() {
      var bounds = instance.bounds;
      controller.context.strokeStyle = instance.color;
      controller.context.strokeRect(bounds.left, bounds.top, bounds.width(), bounds.height());
    }
  
    function render() { 
      instance.render();
    };
  }
  
  Frame.prototype = new Element();
  Frame.prototype.color = "rgb(80, 100, 90)";
  
  exports.Frame = Frame;

})();