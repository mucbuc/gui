(function(){

 
  function DebugFactory() {
  
    Factory.call( this );
    this.register( 'menuView', DebugView );
    this.register( 'onClick', ClickRect );
    this.register( 'text', Label );
    this.register( 'icon', DebugElement );
    this.register( 'frame', Frame );
    this.register( 'button', Button );
    this.register( 'textBox', TextBox );
    this.register( 'row', Row );
    this.register( 'layer', View );
    this.register( 'checkBox', CheckBox );
    this.register( 'panel', View )
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
    
    controller.context.textAlign = 'left';

    controller.once( 'load', function() {
  
      var view = new View( controller );
      view.buildComposite( instance.factory );

      view.pinLeft( 0 ); 
      view.pinRight( controller.clientSize.x * 0.5 );
      view.fillDown( 0, controller.clientSize.y * 0.5 );
    } );
  }

  DebugView.prototype.factory = new DebugFactory();

  exports.DebugFactory = DebugFactory;
  
})();
