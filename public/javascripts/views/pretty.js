    
(function(){

   function PrettyFactory() {
    Factory.call( this );
    this.register( 'menuView', PrettyView );
    this.register( 'icon', Icon );
    this.register( 'onClick', ClickRect );
    this.register( 'text', Label );
    this.register( 'frame', Frame );
    this.register( 'button', Button );
    this.register( 'textBox', TextBox );
    this.register( 'row', Row );
    this.register( 'layer', Stack );
    this.register( 'checkBox', CheckBox );
  }

  PrettyFactory.prototype = new Factory();
  
  function PrettyView( controller ) {
    
    var instance = this
      , elements = 0;
    
    controller.context.textAlign = 'center';

    controller.once( 'load', function() {
  
      var view = new View( controller );
      view.buildComposite( instance.factory );

      view.pinLeft( controller.clientSize.x * 0.25 ); 
      view.pinRight( controller.clientSize.x * 0.75 );
      view.floatDown( controller.clientSize.y * 0.1 );

    } );

  }

  PrettyView.prototype.factory = new PrettyFactory();
  
  exports.PrettyFactory = PrettyFactory;
  
})();
