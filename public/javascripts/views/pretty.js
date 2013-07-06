    
(function(){

   function PrettyFactory() {
    Factory.call( this );
    this.register( 'menuView', PrettyView );
    this.register( 'onClick', ClickRect );
    this.register( 'text', Label );
    this.register( 'frame', Frame );
    this.register( 'button', Button );
    this.register( 'checkBox', CheckBox );
    this.register( 'textBox', TextBox );
    this.register( 'row', RowView );
    this.register( 'layer', Panel );
    this.register( 'icon', Icon );
  }
  PrettyFactory.prototype = new Factory();
  
  function PrettyView( controller ) {
    
    var instance = this
      , elements = 0;
    
    controller.context.textAlign = 'center';

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

  PrettyView.prototype = new ColumnView();


  exports.PrettyFactory = PrettyFactory;
  
})();
