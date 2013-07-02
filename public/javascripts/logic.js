(function(){

  var gui = null
    , logic = { 
        init: function() {
          gui = app.gui;

          gui.on( 'guiUpdate', makeViews );
          pauseGame();
        }
    };

  function resetGame() {
    app.configuration.DEBUG = true;
    pauseGame();
  }

  function pauseGame() {
  
    var buttonPlay = { text: app.language.play, onClick: 'resume', icon: 'public/images/icon.svg', frame: '' }
      , buttonReset = { text: app.language.reset, onClick: 'reset', frame: '' }
      , buttonDebug = { onClick: 'toggle', frame: '' }
      , menu = { 
          button: [ buttonPlay, buttonReset, buttonDebug ],
          text: ''
      };

    syncElements();
    gui.setMenu( menu );
    Game.pause();
    
    gui.once( 'load', function() {

      gui.once( 'unload', function() { 
        gui.removeListener( 'resume', resumeGame );
        gui.removeListener( 'reset', confirmReset );
        gui.removeListener( 'toggle', toggleDebug );
        gui.removeListener( 'update', syncElements );
      } ); 
      
      gui.once( 'resume', resumeGame );
      gui.once( 'reset', confirmReset );
      gui.on( 'toggle', toggleDebug );
      gui.on( 'update', syncElements );
    } );

    function toggleDebug() {
      app.configuration.DEBUG = !app.configuration.DEBUG;
      syncElements();
    }  

    function syncElements() {
      if (buttonDebug.box != app.configuration.DEBUG) {
        buttonDebug.box = app.configuration.DEBUG;
        menu.text = 'debug ' + (buttonDebug.box ? 'on' : 'off');
        gui.onTickEmit( 'update' );
      }
    }
  } 
  
  function resumeGame() {
    var pause = { button : [ { text: app.language.pause, onClick: 'pause', frame: '' } ] }; 
    
    gui.setMenu( pause );
    Game.resume();
    
    gui.once( 'load', function() {
          
      gui.once( 'unload', function() {
        gui.removeListener( 'pause', pauseGame );
        gui.removeListener( 'guiTouch', preventTouch );
        gui.removeListener( 'mouseUp', Game.resume );
      } );
          
      gui.once( 'pause', pauseGame );
      gui.on( 'guiTouch', preventTouch );
          
      function preventTouch() {
        gui.once( 'mouseUp', Game.resume );
        Game.pause(); 
      }
    } );
  }
  
  function confirmReset() {
        
    var confirm = {
          text: app.language.resetQuestion,
          button: [ 
            { text: app.language.yes, onClick: 'confirm' },
            { text: app.language.no, onClick: 'cancel' },
          ]
      };
    
    gui.setMenu( confirm );
  
    gui.once( 'load', function() {
      gui.once( 'unload', function() {
        gui.removeListener( 'confirm', resetGame );
        gui.removeListener( 'cancel', pauseGame );
      } );
        
      gui.once( 'confirm' , resetGame );
      gui.once( 'cancel', pauseGame );
    } );
  }

  function makeViews() { 
    
    if (app.configuration.DEBUG) {
      View.prototype.factory = new DebugFactory();
    }
    else {
      View.prototype.factory = new PrettyFactory();
    }
    
    View.prototype.factory.create( 'menuView', gui );
  }

  exports.logic = logic;

})();