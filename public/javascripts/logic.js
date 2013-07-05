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
  
    var buttonPlay = { icon: 'public/images/icon.svg', text: app.language.play, onClick: 'resume', frame: '' }
      , buttonReset = { textbox: app.language.reset, onClick: 'reset', frame: '' }
      , checkDebug = { checkbox: { state: undefined, onClick: 'toggleDebug' }, text: '' }
      , checkSound = { checkbox: { state: undefined, onClick: 'toggleSound' }, text: '' }
      , menu = { 
          button: [ buttonPlay, buttonReset ],
          layer: [ { row: checkSound, frame: '' }, 
                   { row: checkDebug, frame: '' }, 
          ] }
      , click = app.gui.click;

    syncElements();
    gui.setMenu( menu );
    Game.pause();
    
    gui.once( 'load', function() {

      gui.once( 'unload', function() { 
        gui.removeListener( 'resume', resumeGame );
        gui.removeListener( 'reset', confirmReset );
        gui.removeListener( 'toggleDebug', toggleDebug );
        gui.removeListener( 'toggleSound', toggleSound );
        gui.removeListener( 'update', syncElements );
      } ); 
      
      gui.once( 'resume', resumeGame );
      gui.once( 'reset', confirmReset );
      gui.on( 'toggleDebug', toggleDebug );
      gui.on( 'toggleSound', toggleSound );
      gui.on( 'update', syncElements );
    } );

    function toggleSound() {
      app.configuration.sound = !app.configuration.sound;
      syncElements();
    }

    function toggleDebug() {
      app.configuration.DEBUG = !app.configuration.DEBUG;
      syncElements();
    }  

    function syncElements() {

      var update = false;
      
      if (checkDebug.checkbox.state != app.configuration.DEBUG) {
        checkDebug.checkbox.state = app.configuration.DEBUG;
        checkDebug.text = 'debug ' + (app.configuration.DEBUG ? 'on' : 'off');
        update = true;
      }

      if (checkSound.checkbox.state != app.configuration.sound) {
        checkSound.checkbox.state = app.configuration.sound;
        checkSound.text = 'sound ' + (app.configuration.sound ? 'on' : 'off' );
        
        if (!app.configuration.sound) {
          click = app.gui.click;
          app.gui.click = null;
        }
        else
        {
          app.gui.click = click;
        }
      

        update = true;
      }
    
      if (update) {
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