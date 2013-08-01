/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
<om636/lib/
*/ 

    
(function(){

  function PrettyFrame( controller ) {

    Frame.call( this, controller );

    this.render = function() {
      var bounds = this.bounds
        , width = bounds.width()
        , height = bounds.height(); 

      controller.context.fillStyle = this.fillColor;
      controller.context.fillRect(bounds.left, bounds.top, width, height);
    
      controller.context.strokeStyle = this.frameColor;
      controller.context.strokeRect(bounds.left, bounds.top, width, height);
    };
  }
  PrettyFrame.prototype = new Frame();
  PrettyFrame.prototype.fillColor = "rgb(0, 100, 200)";
  PrettyFrame.prototype.frameColor = "rgb(100, 200, 0)";

  function PrettyButton(controller, factory) {

    var frame = factory.create( 'frame', controller )
      , icon;
    
    if (typeof controller.model.icon !== 'undefined') {
      icon = factory.create( 'icon', new Controller( controller, 'icon' ) ); 
    }

    Button.call( this, controller, factory );
    this.composite.frame = frame;

    this.pinLeft = function( left ) {
      
      if (icon) {
        icon.pinLeft( left - 25 ); // icon.bounds.width() );
      }
      PrettyButton.prototype.pinLeft.call( this, left );
    };

    this.floatDown = function( top ) {
        
      if (icon) {
        icon.pinTop( top - 25 ); // icon.bounds.height() );
        
        icon.onload = function( img ) {
          icon.pinRight( icon.bounds.left + img.width * 0.1 );
          icon.pinBottom( icon.bounds.top + img.height * 0.1 );
        };
      }
      return PrettyButton.prototype.floatDown.call( this, top );
    };
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

    CheckBox.prototype.frameColor = PrettyFrame.prototype.frameColor;

    controller.context.textAlign = 'center';

    controller.once( 'load', function() {
  
      var view = new View( controller )
        , width = controller.clientSize.x * 0.3
        , top = Game.active ? 0 : controller.clientSize.y * 0.1
        , left = Game.active ? 0 : (controller.clientSize.x - width) * 0.5;

      view.buildComposite( instance.factory );
      view.pinLeft( left ); 
      view.pinRight( left + width );
      view.floatDown( top );
    } );
  }

  PrettyView.prototype.factory = new PrettyFactory();
  
  exports.PrettyFactory = PrettyFactory;
  
})();
