/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
This is the test result for the Unknown Worlds GUIFramework design challenge.
*/ 


(function(){
  
  function Button( controller, factory ) {
    
    if (typeof controller !== 'undefined') {
  
      var builder = new Builder( factory )
        , model = controller.model;
    
      Stack.call( this, controller );

      this.composite = {};

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

