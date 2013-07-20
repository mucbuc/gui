/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
<om636/lib/
*/ 


(function(){

  var gui = null
    , click = null
    , logic = { 
        init: function( root ) {
          gui = root;
          click = root.click;

          gui.on( 'guiUpdate', makeViews );
          gui.once( 'pauseGame', pauseGame );
        }
      }
    , strings = english; 
    
  function resetGame() {
    app.init();

    switch(app.setting.language) {
      case 'en':
        strings = english;
        break;
      case 'de':
        strings = german;
        break;
    }

    gui.click = click;
    pauseGame();
  }

  function pauseGame() {
  
    var play = { onClick: 'resumeGame', text: strings.play, icon: 'public/images/icon.svg' }
      , reset = { onClick: 'resetGame', textBox: strings.reset }
      , language = { onClick: 'setLanguage', text: strings.language }
      , sound = { checkBox: { onClick: 'toggleSound' }, text: strings.sound }
      , debug = { checkBox: { onClick: 'toggleDebug' }, text: 'debug' }
      , menu = { 
          button: [ 
            play, 
            reset, 
            language,
            { row: sound },
            { row: debug } 
          ]
        };

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
      app.setting.sound = !app.setting.sound;
      syncElements();
    }

    function toggleDebug() {
      app.configuration.DEBUG = !app.configuration.DEBUG;
      pauseGame();
    }  

    function syncElements() {

      var update = false;
      
      if (debug.checkBox.state != app.configuration.DEBUG) {
        debug.checkBox.state = app.configuration.DEBUG;
        update = true;
      }

      if (sound.checkBox.state != app.setting.sound) {
        sound.checkBox.state = app.setting.sound;
        
        if (!app.setting.sound) {
          if (gui.click) {
            click = gui.click;
          }
          gui.click = null;
        }
        else {
          gui.click = click;
        }
      
        update = true;
      }
    
      if (update) {
        gui.onTickEmit( 'update' );
      }
    }
  } 
  
  function setLanguage() {

    var engl = { checkBox: { onClick: 'toggleEnglish'}, text: strings.english }
      , germ = { checkBox: { onClick:'toggleGerman'}, text: strings.german }
      , menu = { 
          button: [
            { onClick: 'back', text: strings.back }, 
            { row: engl }, 
            { row: germ } 
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
      switch (app.setting.language) {
        case 'en':
          engl.checkBox.state = true;
          germ.checkBox.state = false;
          break;
        case 'de':
          engl.checkBox.state = false;
          germ.checkBox.state = true;
          break;
      }
    }

    function toggleEnglish() {
      if (app.setting.language != 'en') {
        app.setting.language = 'en';
        strings = english;
        setLanguage();
      }
    }

    function toggleGerman() {
      if (app.setting.language != 'de') {
        app.setting.language = 'de';
        strings = german;
        setLanguage();
      }
    }
  }

  function resumeGame() {
    var pause = { button: { onClick: 'pauseGame', text: strings.pause } }; 
    
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