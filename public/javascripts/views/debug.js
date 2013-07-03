(function(){

 
  function DebugFactory() {
  
    Factory.call( this );
    this.register( 'menuView', DebugView );
    this.register( 'onClick', ClickRect );
    this.register( 'text', Label );
    this.register( 'icon', DebugElement );
    this.register( 'frame', Frame );
    this.register( 'button', Button );
    this.register( 'box', CheckBox );
    this.register( 'textbox', TextBox );
  }
  
  DebugFactory.prototype = new Factory();

  function DebugElement( controller ) {
    Element.call( this, controller );
    
    console.log( 'DebugElement Constructor: ', controller.model );
  
    controller.once( 'unload', function() { 
      console.log( 'DebugElement unload:', controller.model );    
    } );
  }

  DebugElement.prototype = new Element();
  
  function DebugView( controller ) {
    
    var instance = this
      , elements = 0;
    
    controller.once( 'load', function() {
    
      var n = 4 
        , size = new Vec( 400 / 4, 400 / 6 )
        , p = new Vec( 0, 0 )
        , delta = new Vec( size.x, 0 );

      View.call( instance, controller, instance.factory );
      elements = instance.composite;
          
      for (var type in elements) {
        var kind = elements[type];
        
        if (kind instanceof Array) {
          
          var sl = new SnapLine( direction.DOWN );

          kind.forEach( function( element ) {
            element.bounds = new Rect( p, size );
            sl.attach( element );
          } );
          delta.y += sl.step( new Vec(100, 0) );
          p = p.add( delta )
        } 
        else {
           kind.bounds = new Rect( p, size );
           p = p.add( delta );
        }
      }
    } );
  }

  DebugView.prototype = new View();
  
  exports.DebugFactory = DebugFactory;
  
})();
