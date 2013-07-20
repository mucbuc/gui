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
      Game.context = document.getElementById( 'canvas' ).getContext( '2d' );
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