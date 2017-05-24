/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/ 

(function() {
  const app = {
      initialized: false, 
      init: function() {

        app.configuration = {
          DEBUG: false,
        }; 

        app.setting = {
          sound: true,
          language: 'en'
        };
 
        if (  !app.initialized 
            && typeof document !== 'undefined') {
          
          var canvas = document.getElementById( 'canvas' );
          app.initialized = true;
          canvas.addEventListener('mousedown', app.onMouseDown, false );
          canvas.addEventListener('mouseup', app.onMouseUp, false );  
          canvas.addEventListener('mousemove', app.onMouseMove, false );

          // drag and drop
          canvas.addEventListener('dragenter', app.onDragEnter, false );
          canvas.addEventListener('dragover', app.onDragOver, false );
          canvas.addEventListener('drop', app.onDrop, false );

          Game.context = canvas.getContext( '2d' );
          Game.canvas = new Canvas( canvas );

          app.gui = new Gui( document.getElementById("click"), canvas, Game.context );
          logic.init(app.gui);

          app.gui.emit( 'pauseGame' );
          
          setInterval( app.update, 20);
        }
      }, 
      update: function() {
        app.gui.context.clearRect( 0, 0, app.gui.canvas.width, app.gui.canvas.height );
        app.gui.render();
        Game.render();
      },
      onMouseDown: function( e ) {
        const p = Game.canvas.positionOnCanvas( e );
        app.gui.onMouseDown( p );
        Game.onMouseDown( p ); 
      },
      onMouseUp: function( e ) {
        const p = Game.canvas.positionOnCanvas( e );
        app.gui.onMouseUp( p );
        Game.onMouseUp( p );
      }, 
      onMouseMove: function( e ) {
        const p = Game.canvas.positionOnCanvas( e );
        app.gui.onMouseMove( p );
        Game.onMouseMove( p );
      }, 
      onDragEnter: function( e ) {
        e.stopPropagation();
        e.preventDefault();
      },
      onDragOver: function( e ) {
        e.stopPropagation();
        e.preventDefault();
      },
      onDrop: function( e ) {
        e.stopPropagation();
        e.preventDefault();

        var dt = e.dataTransfer;

        var files = dt.files;
      
        var reader = new FileReader();
        reader.addEventListener( 'loadend', function(data, file) 
        { 
          console.log( 'onload', data.target.result ); 
        });
        
        console.log(files[0]);      
        reader.readAsText(files[0]);
      }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener( 'load', app.init );
  }

  exports.app = app;

})();
