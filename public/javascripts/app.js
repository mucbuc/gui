(function() {
  
  var app = {

    init: function() {
      
      app.metaData = {
        NAME: 'GUIFramework',
        VERSION: '0.0.0',
        AUTHOR: 'Mark Busenitz',
      };

      app.configuration = {
        DEBUG: false,
      }; 

      app.setting = {
        sound: true,
        language: 'en'
      };
    }

  };

  exports.app = app;

})();
