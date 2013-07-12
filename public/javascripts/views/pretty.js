    
(function(){

  function PrettyFrame( controller ) {

    Frame.call( this, controller );

    this.render = function() {
      var bounds = this.bounds;
      DrawRect(bounds.left, bounds.top, bounds.width(), bounds.height(), true, this.fillColor );
      PrettyFrame.prototype.render.call( this );
    };
  }

  PrettyFrame.prototype = new Frame();
  PrettyFrame.prototype.fillColor = "rgb(0, 100, 200)";

  function PrettyFactory() {
    Factory.call( this );
    this.register( 'menuView', PrettyView );
    this.register( 'icon', Icon );
    this.register( 'onClick', ClickRect );
    this.register( 'text', Label );
    this.register( 'frame', PrettyFrame );
    this.register( 'button', Button );
    this.register( 'textBox', TextBox );
    this.register( 'row', Row );
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
