(function() {
  
  function Gui() {
  
    var model = 0;
    
    RootController.call( this );
    
    this.factory = new Factory();
    this.setMenu = function( model ) {
      this.factory.create( 'menuView', this );
      this.model = model;
    };
    
    this.init = function( canvas ) {
      gui.canvas = canvas;
    };

    this.render = function() {
      this.onTickEmit( 'render' );
      this.tick();
    }; 
    this.onMouseDown = function( x, y ) {
      this.onTickEmit( 'mouseDown', new Vec( x, y ) );
    }; 
    this.onMouseMove = function( x, y ) {
      this.onTickEmit( 'mouseMove', new Vec( x, y ) );
    };
    this.onMouseUp = function( x, y ) {
      this.onTickEmit( 'mouseUp', new Vec( x, y ) );
    };
    
    this.__defineSetter__( 'model', function( v ) {
      
      if (model) {
        this.onTickEmit( 'unload' );  
      }
      model = v;
      this.onTickEmit( 'load' );
  	} );
  
    this.__defineGetter__( 'model', function() {
      return model;
    } );
  };

  Gui.prototype = new RootController( EventStream );
  Gui.prototype.Set = Set;
 
  exports.Gui = Gui;
  
})();
