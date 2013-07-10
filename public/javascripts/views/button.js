(function(){
  
  function Button( controller, factory ) {

    View.call( this, controller );

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

/*
      //this.layoutStack( 0, 0 );
      //this.fillStack( 0, 0, 100, 100 );


    this.fill = function( left, top, right, bottom ) {
      this.elements.forEach( function( element ) {
         element.fill( left, top, right, bottom );
      } );

      //Button.prototype.fill.call( this, left, top, right, bottom );
    };
*/
    this.fillDown = function( top, height ) {
      this.elements.forEach( function( element ) {
        element.fillDown( top, height );
      } );
    
      View.prototype.fillDown.call( this, top, height );
    };

    this.fillRight = function( left, width ) {
      this.elements.forEach( function( element ) {
        element.fillRight( left, width );
      } );

      View.prototype.fillRight.call( this, left, width );
    };
  }
  
  Button.prototype = new View();
  
  exports.Button = Button;

})();

