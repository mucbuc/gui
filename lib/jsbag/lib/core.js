var exports = window;

window.requestAnimFrame = (function() {
  var result = function(callback) {
    window.setTimeout( callback, 1000/60 );
  };
  
  return result;
})(); 

// moved from /node_modules/utils.js
(function(){

  function sign( a ) { 
    return a < 0 ? -1 : (a > 0 ? 1 : 0);
  }

  exports.sign = sign;
  
})();

