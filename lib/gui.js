/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/


(function() {
  
  function Gui( click, canvas, context ) {
  
    var rect = canvas.getBoundingClientRect();

    RootController.call( this );

    this.clientSize = new Vec( rect.right - rect.left, rect.bottom - rect.top );
    this.click = click;
    this.canvas = canvas;
    this.context = context;

    this.setMenu = function( model ) {
      this.onTickEmit( 'guiUpdate' );
      this.model = model;
    };
    this.render = function() {
      this.onTickEmit( 'render' );
      this.tick();
    }; 
    this.onMouseDown = function( p ) {
      this.onTickEmit( 'mouseDown', p );
    }; 
    this.onMouseMove = function( p ) {
      this.onTickEmit( 'mouseMove', p );
    };
    this.onMouseUp = function( p ) {
      this.onTickEmit( 'mouseUp', p );
    };
  }

  Gui.prototype = new RootController( EventStream );
  Gui.prototype.Set = Set;
 
  exports.Gui = Gui;
  
})();