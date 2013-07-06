(function(){

  var gui = null
    , logic = { 
        init: function() {
          gui = app.gui;

          gui.on( 'guiUpdate', makeViews );
          pauseGame();
        }
      }
    , strings = english;

  function resetGame() {
    app.configuration.DEBUG = true;
    app.language = 'en';
    strings = english;
    pauseGame();
  }

  function pauseGame() {
  
    var buttonPlay = { icon: 'public/images/icon.svg', text: strings.play, onClick: 'resumeGame', frame: '' }
      , buttonReset = { textbox: strings.reset, onClick: 'resetGame', frame: '' }
      , buttonLanguage = { text: strings.language, onClick: 'setLanguage' }
      , checkDebug = { checkbox: { onClick: 'toggleDebug' }, text: '' }
      , checkSound = { checkbox: { onClick: 'toggleSound' }, text: '' }
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
        gui.removeListener( 'resetGame', confirmReset );
        gui.removeListener( 'setLanguage', setLanguage );
        gui.removeListener( 'toggleDebug', toggleDebug );
        gui.removeListener( 'toggleSound', toggleSound );
        gui.removeListener( 'update', syncElements );
      } ); 
      gui.once( 'resumeGame', resumeGame );
      gui.once( 'resetGame', confirmReset );
      gui.once( 'setLanguage', setLanguage );
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
  
  function setLanguage() {

    var buttonCancel = { text: strings.back, onClick: 'back', frame: '' }
      , checkEnglish = { checkbox: { onClick: 'toggleEnglish'}, text: strings.english }
      , checkGerman = { checkbox: { onClick:'toggleGerman'}, text: strings.german }
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
          break;
        case 'de':
          checkEnglish.checkbox.state = false;
          checkGerman.checkbox.state = true;
          break;
      }
    }

    function toggleEnglish() {
      if (app.lang != 'en') {
        app.lang = 'en';
        strings = english;
        syncLanguages();
      }
    }

    function toggleGerman() {
      if (app.lang != 'de') {
        app.lang = 'de';
        strings = german;
        syncLanguages();
      }
    }
  }

  function resumeGame() {
    var pause = { button : [ { text: strings.pause, onClick: 'pauseGame', frame: '' } ] }; 
    
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
          text: strings.resetQuestion,
          button: [ 
            { text: strings.yes, onClick: 'confirm' },
            { text: strings.no, onClick: 'cancel' },
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