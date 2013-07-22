/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
<om636/lib/
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
        
        Game.context.fillStyle = "rgb(150, 0, 50)";
        Game.context.fillRect(Game.pos.x, Game.pos.y, SIZE, SIZE);
      }
    },
    onMouseDown: function( p ) {
      if (Game.active) {
        Game.pos = p;
      }
    }, 
    onMouseMove: function( p ) {
      if (Game.pos) {
          Game.pos = p;
      }
    }, 
    onMouseUp: function( x, y ) {
      Game.pos = 0;
    }, 
  };

  exports.Game = Game;

})();