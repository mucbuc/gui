(function(){
  
  function makeContextPaused(strings) {

    var play = { onClick: 'resumeGame', text: strings.play, icon: 'images/icon.svg' }
      , reset = { onClick: 'resetGame', textBox: strings.reset }
      , language = { onClick: 'setLanguage', text: strings.language }
      , sound = { checkBox: { onClick: 'toggleSound' }, text: strings.sound }
      , debug = { checkBox: { onClick: 'toggleDebug' }, text: 'debug' };

    return {
        sound: sound,
        debug: debug,
        menu: {
          button: [ 
            play, 
            reset, 
            language,
            { row: sound },
            { row: debug } 
          ]
        }
      };
  }

  function makeContextLanguage(strings) {
    
    var engl = { checkBox: { onClick: 'toggleEnglish'}, text: strings.english }
      , germ = { checkBox: { onClick:'toggleGerman'}, text: strings.german };

    return { 
        engl: engl,
        germ: germ,
        menu: {
          button: [
            { onClick: 'back', text: strings.back }, 
            { row: engl }, 
            { row: germ } 
          ]
        } 
      };
  }

  function makeContextPause(strings) {
    return {
        menu: { button: { onClick: 'pauseGame', text: strings.pause } }
      };
  }

  function makeContextReset(strings) {
    return {
        menu: {
          text: strings.resetQuestion,
          button: [ 
            { onClick: 'confirm', text: strings.yes },
            { onClick: 'cancel', text: strings.no },
          ]
        }
      };
  }

  exports.makeContextPaused = makeContextPaused;
  exports.makeContextLanguage = makeContextLanguage;
  exports.makeContextPause = makeContextPause;
  exports.makeContextReset = makeContextReset;

})();