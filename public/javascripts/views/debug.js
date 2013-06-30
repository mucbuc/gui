(function(){

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
    
      var builder = new Builder( controller );
      elements = builder.buildElements( app.gui.factory ).product;
    
      var n = 4 
        , size = new Vec( 400 / 4, 400 / 6 )
        , p = new Vec( 0, 0 )
        , delta = new Vec( size.x, 0 );
          
      for (var type in elements) {
        var kind = elements[type];
        
        if (kind instanceof Array) {
          kind.forEach( function( element ) {
            element.bounds = new Rect( p, size );
            p = p.add( delta );
          } );
        } 
        else {
           kind.bounds = new Rect( p, size );
           p = p.add( delta );
        }
      }
    } );
  }
 
  function DebugFactory() {
  
    Factory.call( this );
    this.register( 'menuView', DebugView );
    this.register( 'onClick', ClickRect );
    this.register( 'text', Label );
    this.register( 'icon', Icon );
    this.register( 'frame', Frame );
    this.register( 'button', Button );
    this.register( 'box', CheckBox );
  }
  
  DebugFactory.prototype = new Factory();
 
  exports.DebugFactory = DebugFactory;
  
})();
