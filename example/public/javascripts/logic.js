/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
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

    var context = makeContextPaused(strings);

    syncElements();
    Game.pause();
    gui.setMenu( context.menu );

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
      
      if (context.debug.checkBox.state != app.configuration.DEBUG) {
        context.debug.checkBox.state = app.configuration.DEBUG;
        update = true;
      }

      if (context.sound.checkBox.state != app.setting.sound) {
        context.sound.checkBox.state = app.setting.sound;
        
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
        gui.emit( 'update' );
      }
    }
  } 
  
  function setLanguage() {

    var context = makeContextLanguage(strings);

    syncLanguages();
    
    gui.setMenu( context.menu );
    
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
          context.engl.checkBox.state = true;
          context.germ.checkBox.state = false;
          break;
        case 'de':
          context.engl.checkBox.state = false;
          context.germ.checkBox.state = true;
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
    var context = makeContextPause(strings);

    gui.setMenu( context.menu );
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
        
    var context = makeContextReset(strings);
    
    gui.setMenu( context.menu );
  
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