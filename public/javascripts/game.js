/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
This is the result for the Unknown Worlds GUIFramework design test.
*/ 


(function(){
  
  var Game = {
    active: false,
    pos: 0,
    resume: function() {
      Game.active = true;
    }, 
    pause: function() {
      Game.active = false;
      Game.pos = 0;
    },
    render: function() {
      if (Game.pos) {
        var SIZE = 20;
        DrawRect(Game.pos.x, Game.pos.y, SIZE, SIZE, true, "rgb(150, 0, 50)");
      }
    },
    onMouseDown: function( x, y ) {
      if (Game.active) {
        Game.pos = { x: x, y: y };
      }
    }, 
    onMouseMove: function( x, y ) {
      if (Game.pos) {
          Game.pos = { x: x, y: y };
      }
    }, 
    onMouseUp: function( x, y ) {
      Game.pos = 0;
    }, 
  };

  exports.Game = Game;

})();