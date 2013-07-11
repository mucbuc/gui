    
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
    
    controller.context.textAlign = 'left';

    controller.once( 'load', function() {
  
      var view = new View( controller );
      view.buildComposite( instance.factory );

      view.pinLeft( 0 ); 
      view.pinRight( controller.clientSize.x * 0.5 );
      view.fillDown( 0, controller.clientSize.y * 0.5 );
    } );

  }

 // PrettyView.prototype = new ColumnView();

  PrettyView.prototype.factory = new PrettyFactory();
  
  exports.PrettyFactory = PrettyFactory;
  
})();
