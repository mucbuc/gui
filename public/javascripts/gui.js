(function() {
  
  function Gui() {
  
    RootController.call( this );
    
    this.setMenu = function( model ) {
      this.onTickEmit( 'menuUpdate' );
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
  };

  Gui.prototype = new RootController( EventStream );
  Gui.prototype.Set = Set;
 
  exports.Gui = Gui;
  
})();
