/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
This is the result for the Unknown Worlds GUIFramework design test.
*/ 


(function(){

  function DebugButton(controller, factory) {
    
    if (typeof controller !== 'undefined') {
      
      var frame = factory.create( 'frame', controller );

      Button.call( this, controller, factory );
    
      this.composite.frame = frame;
    }
  }

  DebugButton.prototype = new Button();
 
  function DebugFactory() {
    Factory.call( this );
    this.register( 'menuView', DebugView );
    this.register( 'icon', DebugElement );
    this.register( 'onClick', ClickRect );
    this.register( 'text', Label );
    this.register( 'frame', Frame );
    this.register( 'button', DebugButton );
    this.register( 'textBox', TextBox );
    this.register( 'row', Row );
    this.register( 'checkBox', CheckBox );
  }
  
  DebugFactory.prototype = new Factory();

  function DebugElement( controller ) {
    Element.call( this, controller );
    
    console.log( 'DebugElement Constructor: ', controller.model );
  
    controller.once( 'unload', function() { 
      console.log( 'DebugElement unload' );    
    } );
  }

  DebugElement.prototype = new Element();
  
  function DebugView( controller ) {
    
    var instance = this
      , elements = 0;

    CheckBox.prototype.frameColor = Frame.prototype.color;
    
    controller.context.textAlign = 'left';

    controller.once( 'load', function() {
  
      var view = new View( controller );
      view.buildComposite( instance.factory );
      view.pinLeft( 0 ); 
      view.pinRight( controller.clientSize.x * 0.5 );
      
      //view.fillDown( 0, 200 );
      view.floatDown( 0 );
    } );
  }

  DebugView.prototype.factory = new DebugFactory();

  exports.DebugFactory = DebugFactory;
  
})();
