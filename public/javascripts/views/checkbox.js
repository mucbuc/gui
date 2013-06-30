(function(){

  function CheckBox( controller ) {

    var instance = this;
    
    if (controller == 'undefined') {
      return;
    }
    
    var model = controller.model;
    
    ClickRect.call( this, controller, toggle );
    
    controller.once( 'unload', function() {
      controller.removeListener( 'render', render );
      controller.removeListener( 'update', update );
    } );
    
    controller.on( 'render', render );
    controller.on( 'update', update );
  
    function update() {
      model = controller.model;
    }
  
    function toggle() {
      controller.model = !model;
    }
  
    function render() {
      var GAP = 5
        , GAP_DUB = 2 * GAP;
      DrawRect(instance.left, instance.top, instance.width, instance.height, true, "rgb(80, 100, 90)");
      
      if (model) {
        DrawRect(instance.left + GAP, instance.top + GAP, instance.width - GAP_DUB, instance.height - GAP_DUB, true, "rgb(250, 250, 250)");
      }
      else {
        DrawRect(instance.left + GAP, instance.top + GAP, instance.width - GAP_DUB, instance.height - GAP_DUB, true, "rgb(50, 50, 50)");
      }
    }
  }
  
  CheckBox.prototype = new ClickRect();
  
  exports.CheckBox = CheckBox;

})();