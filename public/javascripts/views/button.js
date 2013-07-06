(function(){
  
  function Button( controller, factory ) {

    LayerView.call( this, 'undefined'/*controller*/, factory );

    if (typeof controller !== 'undefined') {
         
      var builder = new Builder( factory ); 
      this.composite = {};

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
    }
  }
  
  Button.prototype = new LayerView();
  
  exports.Button = Button;

})();

