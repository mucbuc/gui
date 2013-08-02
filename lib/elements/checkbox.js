/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/

(function(){

  function CheckBox( controller ) {

    var DIM = 15
      , MARGIN = 5
      , instance = this;

    if (controller !== 'undefined') {
      var model = controller.model;
      
      ClickRect.call( this, new Controller( controller, 'onClick' ) );

      this.floatWidth = DIM + MARGIN;

      controller.once( 'unload', function() {
        controller.removeListener( 'render', render );
        controller.removeListener( 'update', update );
      });
      
      controller.on( 'render', render );
      controller.on( 'update', update );    
    }

    this.pinTop = function( top ) {
      CheckBox.prototype.pinTop.call( this, top );
      centerVertical( this );
    };

    this.pinBottom = function( bottom ) {
      CheckBox.prototype.pinBottom.call( this, bottom );
      centerVertical( this );
    };

    this.pinLeft = function( left ) {
      CheckBox.prototype.pinLeft.call( this, left + MARGIN );
    };

    function centerVertical( box ) {
      if (box.bounds.bottom > box.bounds.top) {
        var diff = (box.bounds.height() - DIM) / 2;
        CheckBox.prototype.pinTop.call( box, box.bounds.top + diff );
        CheckBox.prototype.pinBottom.call( box, box.bounds.bottom - diff );
      }
    }

    function update() {
      model = controller.model;
    }
  
    function render() {
      var GAP = 2
        , GAP_DUB = 2 * GAP
        , bounds = instance.bounds;
    
      controller.context.fillStyle = instance.frameColor;
      controller.context.fillRect(bounds.left, bounds.top, bounds.width(), bounds.height());        
      
      if (model.state) {
        controller.context.fillStyle = "rgb(50, 50, 50)";
      }
      else {
        controller.context.fillStyle = "rgb(250, 250, 250)";
      }

      controller.context.fillRect(bounds.left + GAP, bounds.top + GAP, bounds.width() - GAP_DUB, bounds.height() - GAP_DUB);  
    }
  }
  
  CheckBox.prototype = new ClickRect();
  CheckBox.prototype.frameColor = "rgb(0, 0, 0)";
  
  exports.CheckBox = CheckBox;

})();