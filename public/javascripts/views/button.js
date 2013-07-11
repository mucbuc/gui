(function(){
  
  function Button( controller, factory ) {
    
    var instance = this;
    if (typeof controller !== 'undefined') {
  
      var builder = new Builder( factory );
    
      View.call( this, controller );

      this.composite = {};
      this.floatHeight = 80;

      if (typeof controller.model.frame !== 'undefined') {
        this.composite.frame = builder.buildComponent( 'frame', controller );
      }

      if (typeof controller.model.icon !== 'undefined') {
        this.composite.icon = builder.buildComposite( new Controller( controller, 'icon' ), 'icon' ); 
      }

      if (typeof controller.model.textBox !== 'undefined') {
        this.composite.textBox = builder.buildComposite( new Controller( controller, 'textBox' ), 'textBox' ); 
      }

      if (typeof controller.model.text !== 'undefined') {
        this.composite.text = builder.buildComposite( new Controller( controller, 'text' ), 'text' ); 
      }

      if (typeof controller.model.checkBox !== 'undefined') {
        this.composite.checkBox = builder.buildComposite( new Controller( controller, 'checkBox' ), 'checkBox' ); 
      }

      if (typeof controller.model.onClick !== 'undefined') {
        this.composite.onClick = builder.buildComposite( new Controller( controller, 'onClick' ), 'onClick' ); 
      }

      this.forEach( function( element ) {
        element.floatHeight = instance.floatHeight;
      });
    }

    this.floatDown = function( top ) {
      Button.prototype.pinTop.call( this, top );
      Button.prototype.pinBottom.call( this, top + this.floatHeight );
      return this.floatHeight;
    };

    this.floatRight = function( left ) {
      Button.prototype.pinLeft.call( this, left );
      Button.prototype.pinRight.call( this, top + this.floatWidth );
      return this.floatWidth;
    };
  }
  
  Button.prototype = new View();
  
  exports.Button = Button;

})();

