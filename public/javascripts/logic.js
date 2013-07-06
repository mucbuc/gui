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
      , buttonLanguage = { text: app.language.language, onClick: 'language' }
      , checkDebug = { checkbox: { state: undefined, onClick: 'toggleDebug' }, text: '' }
      , checkSound = { checkbox: { state: undefined, onClick: 'toggleSound' }, text: '' }
      , menu = { 
          button: [ buttonPlay, buttonReset, buttonLanguage ],
          layer: [ { row: checkSound, frame: '' }, 
                   { row: checkDebug, frame: '' }, 
          ] }
      , click = app.gui.click;

    syncElements();
    Game.pause();
    
    gui.setMenu( menu );

    gui.once( 'load', function() {

      gui.once( 'unload', function() { 
        gui.removeListener( 'resumeGame', resumeGame );
        gui.removeListener( 'reset', confirmReset );
        gui.removeListener( 'toggleDebug', toggleDebug );
        gui.removeListener( 'toggleSound', toggleSound );
        gui.removeListener( 'update', syncElements );
        gui.removeListener( 'language', setLanguage );
      } ); 
      
      gui.once( 'resumeGame', resumeGame );
      gui.once( 'reset', confirmReset );
      gui.on( 'toggleDebug', toggleDebug );
      gui.on( 'toggleSound', toggleSound );
      gui.on( 'update', syncElements );
      gui.on( 'language', setLanguage )
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
  
  function setLanguage() {

    var buttonCancel = { text: app.language.back, onClick: 'back', frame: '' }
      , checkEnglish = { checkbox: { state: undefined, onClick: 'toggleEnglish' }, text: app.language.english }
      , checkGerman = { checkbox: { state: undefined, onClick: 'toggleGerman' }, text: app.language.german }
      , menu = { 
          button: [ buttonCancel ], 
          layer: [ { row: checkEnglish, frame: '' },
                   { row: checkGerman, frame: '' }, 
          ] 
        };

    syncLanguages();
    
    gui.setMenu( menu );
    
    gui.once( 'load', function() {

      gui.once( 'unload', function() {
        gui.removeListener( 'back', pauseGame );
        gui.removeListener( 'toggleEnglish', toggleEnglish ); 
        gui.removeListener( 'toggleGerman', toggleGerman );
      });
  
      gui.on( 'back', pauseGame );
      gui.on( 'toggleEnglish', toggleEnglish ); 
      gui.on( 'toggleGerman', toggleGerman );
    });

    function syncLanguages() {
      switch( app.lang ) {
        case 'en':
          checkEnglish.checkbox.state = true;
          checkGerman.checkbox.state = false;
          app.language = english;
          break;
        case 'de':
          checkEnglish.checkbox.state = false;
          checkGerman.checkbox.state = true;
          app.language = german;
          break;
      }
    }

    function toggleEnglish() {
      if (app.lang != 'en') {
        app.lang = 'en';
        syncLanguages();
      }
    }

    function toggleGerman() {
      if (app.lang != 'de') {
        app.lang = 'de';
        syncLanguages();
      }
    }
  }

  function resumeGame() {
    var pause = { button : [ { text: app.language.pause, onClick: 'pause', frame: '' } ] }; 
    
    gui.setMenu( pause );
    Game.resume();
    
    gui.once( 'load', function() {
          
      gui.once( 'unload', function() {
        gui.removeListener( 'pauseGame', pauseGame );
        gui.removeListener( 'guiTouch', preventTouch );
        gui.removeListener( 'mouseUp', Game.resume );
      } );
          
      gui.once( 'pauseGame', pauseGame );
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