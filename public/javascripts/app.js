/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
<om636/lib/
*/ 


(function() {
  
  var app = {
      init: function() {
        
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
      }, 
      update: function() {
        app.gui.context.clearRect( 0, 0, app.gui.canvas.width, app.gui.canvas.height );
        app.gui.render();
        app.gui.tick();
        Game.render();
      },
      onMouseDown: function( x , y ) {
        app.gui.onMouseDown( x, y );
        Game.onMouseDown( x, y );
      },
      onMouseUp: function( x, y ) {
        app.gui.onMouseUp( x, y );
        Game.onMouseUp( x, y );
      }, 
      onMouseMove: function(x, y) {
        app.gui.onMouseMove( x, y );
        Game.onMouseMove( x, y );
      }, 
  };

  exports.app = app;

})();
