(function(){

  function CheckBox( controller ) {

    if (controller !== 'undefined') {
      var instance = this
        , model = controller.model;
      
      ClickRect.call( this, controller, toggle );

      controller.once( 'unload', function() {
        controller.removeListener( 'render', render );
        controller.removeListener( 'update', update );
      });
      
      controller.on( 'render', render );
      controller.on( 'update', update );    
    }
    
    function update() {
      model = controller.model;
    }

    function toggle() {
      controller.model != controller.model;
      controller.onTickEmit( controller.model.onToggle );
    }
  
    function render() {
      var GAP = 5
        , GAP_DUB = 2 * GAP
        , bounds = instance.bounds;
        
      DrawRect(bounds.left, bounds.top, bounds.width(), bounds.height(), true, "rgb(80, 100, 90)");
      
      if (model) {
        DrawRect(bounds.left + GAP, bounds.top + GAP, bounds.width() - GAP_DUB, bounds.height() - GAP_DUB, true, "rgb(250, 250, 250)");
      }
      else {
        DrawRect(bounds.left + GAP, bounds.top + GAP, bounds.width() - GAP_DUB, bounds.height() - GAP_DUB, true, "rgb(50, 50, 50)");
      }
    }
  }
  
  CheckBox.prototype = new ClickRect();
  
  exports.CheckBox = CheckBox;

})();