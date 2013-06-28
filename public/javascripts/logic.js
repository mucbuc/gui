(function(){

  var gui
    , logic = { 
        init: function() {
          gui = app.gui;
          pauseGame();
        },
    };
  
  function resetGame() {
    app.configuration.DEBUG = true;
    pauseGame();
  }

  function pauseGame() {
  
    var buttonPlay = { text: 'play', onClick: 'resume', icon: 'public/images/icon.svg', frame: '' }
      , buttonReset = { text: 'reset', onClick: 'reset', frame: '' }
      , buttonDebug = { box: app.configuration.DEBUG, text: '', frame: '' }
      , menu = { button : [ buttonPlay, buttonReset, buttonDebug ] };

    syncElements();
    
    gui.setMenu( menu );
    Game.pause();
    
    gui.once( 'load', function() {
      gui.once( 'unload', function() { 
        gui.removeListener( 'resume', resumeGame );
        gui.removeListener( 'reset', confirmReset );
        gui.removeListener( 'update', syncElements );
      } ); 
      
      gui.once( 'resume', resumeGame );
      gui.once( 'reset', confirmReset );
      gui.on( 'update', syncElements );
    } );

    function syncElements() {
      app.configuration.DEBUG = buttonDebug.box;
      buttonDebug.text = 'debug ' + (buttonDebug.box ? 'on' : 'off');
    }
  } 
  
  function resumeGame() {
    var pause = { button : [ { text: 'pause', onClick: 'pause', frame: '' } ] }; 
    
    app.gui.setMenu( pause );
    Game.resume();
    
    app.gui.once( 'load', function() {
          
      app.gui.once( 'unload', function() {
        app.gui.removeListener( 'pause', pauseGame );
        app.gui.removeListener( 'guiTouch', preventTouch );
        app.gui.removeListener( 'mouseUp', Game.resume );
      } );
          
      app.gui.once( 'pause', pauseGame );
      app.gui.on( 'guiTouch', preventTouch );
          
      function preventTouch() {
        app.gui.once( 'mouseUp', Game.resume );
        Game.pause(); 
      }
    } );
  }
  
  function confirmReset() {
        
    var confirm = {
          text: 'reset?',
          button: [ 
            { text: 'yes', onClick: 'confirm' },
            { text: 'no', onClick: 'cancel' },
          ]
      };
    
    app.gui.setMenu( confirm );
        
    gui.once( 'load', function() {
      gui.once( 'unload', function() {
        gui.removeListener( 'confirm', resetGame );
        gui.removeListener( 'cancel', pauseGame );
      } );
        
      gui.once( 'confirm' , resetGame );
      gui.once( 'cancel', pauseGame );
    } );
  }

  exports.logic = logic;

})();