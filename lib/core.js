window.requestAnimFrame = (function() {
  var result = function(callback) {
    window.setTimeout( callback, 1000/60 );
  };
  
  return result;
})(); 

