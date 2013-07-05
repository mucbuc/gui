(function(){

 
  function DebugFactory() {
  
    Factory.call( this );
    this.register( 'menuView', DebugView );
    this.register( 'onClick', ClickRect );
    this.register( 'text', Label );
    this.register( 'icon', DebugElement );
    this.register( 'frame', Frame );
    this.register( 'button', LayerView );
    this.register( 'checkbox', CheckBox );
    this.register( 'textbox', TextBox );
    this.register( 'row', RowView );
    this.register( 'layer', LayerView );
    this.register( 'checkbox', CheckBox );
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
    
    controller.context.textAlign = 'left';

    controller.once( 'load', function() {
    
      var n = 4 
        , size = new Vec( 400 / 4, 400 / 8 )
        , p = new Vec( 0, 0 )
        , delta = new Vec( size.x, 0 )
        , sl = new SnapLine( direction.DOWN );

      ColumnView.call( instance, controller, instance.factory );
      elements = instance.composite;
    
      for (var type in elements) {
        var kind = elements[type];

        if (kind instanceof Array) {
          kind.forEach( function( element ) {
            element.bounds.size = size;
            sl.attach( element );
          } );
        } 
        else {
          kind.bounds.size = size;
          sl.attach( kind ); 
        }
      }
      delta.y += sl.step( new Vec(100, 0) );
    } );
  }

  DebugView.prototype = new ColumnView();
  
  exports.DebugFactory = DebugFactory;
  
})();
