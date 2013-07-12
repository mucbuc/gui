    
(function(){

  function PrettyFrame( controller ) {

    Frame.call( this, controller );

    this.render = function() {
      var bounds = this.bounds
        , width = bounds.width()
        , height = bounds.height(); 

      DrawRect(bounds.left, bounds.top, width, height, true, this.fillColor );
      DrawRect(bounds.left, bounds.top, width, height, false, this.frameColor );
    };
  }
  PrettyFrame.prototype = new Frame();
  PrettyFrame.prototype.fillColor = "rgb(0, 100, 200)";
  PrettyFrame.prototype.frameColor = "rgb(100, 200, 0)";


  function PrettyButton(controller, factory) {

    var frame = factory.create( 'frame', controller );
    Button.call( this, controller, factory );
    this.composite.frame = frame;
  }
  PrettyButton.prototype = new Button();

  
  function PrettyFactory() {
    Factory.call( this );
    this.register( 'menuView', PrettyView );
    this.register( 'icon', Icon );
    this.register( 'onClick', ClickRect );
    this.register( 'text', Label );
    this.register( 'frame', PrettyFrame );
    this.register( 'button', PrettyButton );
    this.register( 'textBox', TextBox );
    this.register( 'row', Row );
    this.register( 'checkBox', CheckBox );
  }
  PrettyFactory.prototype = new Factory();

  
  function PrettyView( controller ) {
    
    var instance = this
      , elements;

    PrettyView.prototype.topRelative = Game.active ? 0 : 0.1;

    controller.context.textAlign = 'center';

    controller.once( 'load', function() {
  
      var view = new View( controller )
        , width = controller.clientSize.x * 0.4;

      view.buildComposite( instance.factory );


      view.pinLeft( (controller.clientSize.x - width) * 0.5 ); 
      view.pinRight( (controller.clientSize.x + width) * 0.5 );
      view.floatDown( controller.clientSize.y * instance.topRelative );
    } );
  }

  PrettyView.prototype.factory = new PrettyFactory();
  
  exports.PrettyFactory = PrettyFactory;
  
})();
