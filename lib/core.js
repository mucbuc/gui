var exports = window;

window.requestAnimFrame = (function() {
  var result = function(callback) {
    window.setTimeout( callback, 1000/60 );
  };
  
  return result;
})(); 

// moved from /node_modules/utils.js
(function(){

  var cache = {};

  function sign( a ) { 
    return a < 0 ? -1 : (a > 0 ? 1 : 0);
  }

  function getTextWidth( text, context ) {

  	if (!cache[text]) {
  		cache[text] = context.measureText( text ).width;
  	}

  	return cache[text];
  }

  exports.sign = sign;
  exports.getTextWidth = getTextWidth;

})();

