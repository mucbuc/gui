(function(){
  
  function Button( controller, factory ) {
    
    if (typeof controller !== 'undefined') {
  
      var builder = new Builder( factory )
        , model = controller.model;
    
      Stack.call( this, controller );

      this.composite = {};
  
      if (typeof model.frame !== 'undefined') {
        this.composite.frame = builder.buildComponent( 'frame', controller );
      }

      if (typeof model.icon !== 'undefined') {
        this.composite.icon = builder.buildComposite( new Controller( controller, 'icon' ), 'icon' ); 
      }

      if (typeof model.textBox !== 'undefined') {
        this.composite.textBox = builder.buildComposite( new Controller( controller, 'textBox' ), 'textBox' ); 
      }

      if (typeof model.text !== 'undefined') {
        this.composite.text = builder.buildComposite( new Controller( controller, 'text' ), 'text' ); 
      }

      if (typeof model.onClick !== 'undefined') {
        this.composite.onClick = builder.buildComposite( new Controller( controller, 'onClick' ), 'onClick' ); 
      }

      if (typeof model.row !== 'undefined') {
        this.composite.row = builder.buildComposite( new Controller( controller, 'row' ), 'row' ); 
      }
    }
  }
  
  Button.prototype = new Stack();
  
  exports.Button = Button;

})();

