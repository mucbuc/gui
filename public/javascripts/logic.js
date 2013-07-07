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
    app.settings.language = 'en';
    strings = english;
    pauseGame();
  }

  function pauseGame() {
  
    var play = { onClick: 'resumeGame', text: strings.play, icon: 'public/images/icon.svg', frame: '' }
      , reset = { onClick: 'resetGame', textBox: strings.reset, frame: '' }
      , language = { onClick: 'setLanguage', text: strings.language, frame:'' }
      , debug = { checkBox: { onClick: 'toggleDebug' }, text: 'debug' }
      , sound = { checkBox: { onClick: 'toggleSound' }, text: 'sound' }
      , menu = { 
          button: [ play, reset, language ],
          layer: [ { row: sound, frame: '' }, 
                   { row: debug, frame: '' } 
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
      app.settings.sound = !app.settings.sound;
      syncElements();
    }

    function toggleDebug() {
      app.configuration.DEBUG = !app.configuration.DEBUG;
      syncElements();
    }  

    function syncElements() {

      var update = false;
      
      if (debug.checkBox.state != app.configuration.DEBUG) {
        debug.checkBox.state = app.configuration.DEBUG;
        update = true;
      }

      if (sound.checkBox.state != app.settings.sound) {
        sound.checkBox.state = app.settings.sound;
        
        if (!app.settings.sound) {
          click = app.gui.click;
          app.gui.click = null;
        }
        else {
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

    var english = { checkBox: { onClick: 'toggleEnglish'}, text: strings.english }
      , german = { checkBox: { onClick:'toggleGerman'}, text: strings.german }
      , menu = { 
          button: { onClick: 'back', text: strings.back, frame: '' }, 
          layer: [ 
            { row: english, frame: '' },
            { row: german, frame: '' }, 
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
      switch (app.settings.language) {
        case 'en':
          english.checkBox.state = true;
          german.checkBox.state = false;
          break;
        case 'de':
          english.checkBox.state = false;
          german.checkBox.state = true;
          break;
      }
    }

    function toggleEnglish() {
      if (app.settings.language != 'en') {
        app.settings.language = 'en';
        strings = english;
        syncLanguages();
      }
    }

    function toggleGerman() {
      if (app.settings.language != 'de') {
        app.settings.language = 'de';
        strings = german;
        syncLanguages();
      }
    }
  }

  function resumeGame() {
    var pause = { button: [ { onClick: 'pauseGame', text: strings.pause, frame: '' } ] }; 
    
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
            { onClick: 'confirm', text: strings.yes },
            { onClick: 'cancel', text: strings.no },
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