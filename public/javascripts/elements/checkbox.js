(function(){

  function CheckBox( controller ) {

    if (controller !== 'undefined') {
      var instance = this
        , model = controller.model;
      
      ClickRect.call( this, new Controller( controller, 'onClick' ) );

      controller.once( 'unload', function() {
        controller.removeListener( 'render', render );
        controller.removeListener( 'update', update );
      });
      
      controller.on( 'render', render );
      controller.on( 'update', update );    
    }
    
    this.layoutVertical = function( top ) {
      var height = this.bounds.height()
        , boxHeight = height * 0.2;

      this.bounds.setHeight( boxHeight );
      return CheckBox.prototype.layoutVertical.call( this, top + boxHeight * 2 ); 
    };

    this.layoutHorizontal = function( left ) {
      var width = this.bounds.height();
      this.bounds.setWidth( width );
      return CheckBox.prototype.layoutHorizontal.call( this, left );    
    };

    function update() {
      model = controller.model;
    }
  
    function render() {
      var GAP = 2
        , GAP_DUB = 2 * GAP
        , bounds = instance.bounds;
        
      DrawRect(bounds.left, bounds.top, bounds.width(), bounds.height(), true, "rgb(80, 100, 90)");
      
      if (model.state) {
        DrawRect(bounds.left + GAP, bounds.top + GAP, bounds.width() - GAP_DUB, bounds.height() - GAP_DUB, true, "rgb(50, 50, 50)");
      }
      else {
        DrawRect(bounds.left + GAP, bounds.top + GAP, bounds.width() - GAP_DUB, bounds.height() - GAP_DUB, true, "rgb(250, 250, 250)");
      }
    }
  }
  
  CheckBox.prototype = new ClickRect();
  
  exports.CheckBox = CheckBox;

})();