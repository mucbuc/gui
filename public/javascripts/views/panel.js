(function(){

  function Panel( controller, factory ) {
    
    LayerView.call( this, undefined, factory );

    if (typeof controller !== 'undefined') {
         
      console.log( controller.model );

      var builder = new Builder( factory ); 
      this.composite = {};

      if (typeof controller.model.frame !== 'undefined') {
        this.composite.frame = builder.buildComponent( 'frame', controller );
      }

      if (typeof controller.model.textBox !== 'undefined') {
        this.composite.textBox = builder.buildComposite( new Controller( controller, 'textBox' ), 'textBox' ); 
      }

      if (typeof controller.model.text !== 'undefined') {
        this.composite.text = builder.buildComposite( new Controller( controller, 'text' ), 'text' ); 
      }
      
      if (typeof controller.model.row !== 'undefined') {
        this.composite.row = builder.buildComposite( new Controller( controller, 'row' ), 'row' ); 
      }
    }

  }

  Panel.prototype = new LayerView();

  exports.Panel = Panel;

})();
