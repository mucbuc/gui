/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
<om636/lib/
*/ 


(function() {
  
  var app = {
      init: function() {
        
        var canvas = document.getElementById( 'maincanvas' );

        app.metaData = {
          NAME: 'GUIFramework',
          VERSION: '0.0.0',
          AUTHOR: 'Mark Busenitz',
        };

        app.configuration = {
          DEBUG: false,
        }; 

        app.setting = {
          sound: true,
          language: 'en'
        };

        Game.context = canvas.getContext( '2d' );
        Game.canvas = new Canvas( canvas );
      }, 
      update: function() {
        app.gui.context.clearRect( 0, 0, app.gui.canvas.width, app.gui.canvas.height );
        app.gui.render();
        app.gui.tick();
        Game.render();
      },
      onMouseDown: function( e ) {
        var p = Game.canvas.positionOnCanvas( e );
        app.gui.onMouseDown( p );
        Game.onMouseDown( p ); 
      },
      onMouseUp: function( e ) {
        var p = Game.canvas.positionOnCanvas( e );
        app.gui.onMouseUp( p );
        Game.onMouseUp( p );
      }, 
      onMouseMove: function( e ) {
        var p = Game.canvas.positionOnCanvas( e );
        app.gui.onMouseMove( p );
        Game.onMouseMove( p );
      }, 
  };

  exports.app = app;

})();
