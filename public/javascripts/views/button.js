(function(){
  
  function Button( controller, factory ) {

    LayerView.call( this, 'undefined'/*controller*/, factory );

    if (typeof controller !== 'undefined') {
         
      var builder = new Builder( factory ); 
      this.composite = {};

      if (controller.model.icon) {
        this.composite.icon = builder.buildComposite( new Controller( controller, 'icon' ), 'icon' ); 
      }

      this.composite.frame = builder.buildComponent( 'frame', controller );

      if (controller.model.textbox) {
        this.composite.textbox = builder.buildComposite( new Controller( controller, 'textbox' ), 'textbox' ); 
      }
      
      this.composite.text = builder.buildComposite( new Controller( controller, 'text' ), 'text' ); 
      this.composite.onClick = builder.buildComposite( new Controller( controller, 'onClick' ), 'onClick' ); 
    }
  }
  
  Button.prototype = new LayerView();
  
  exports.Button = Button;

})();

