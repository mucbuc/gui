/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
*/ 

if (typeof window !== 'undefined') {
  var exports = window;

  window.requestAnimFrame = (function() {
    var result = function(callback) {
      window.setTimeout( callback, 1000/60 );
    };
    
    return result;
  })(); 

  function getTimeHHMMSS() {
    var t = new Date()
      , h = t.getHours()
      , m = t.getMinutes()
      , s = t.getSeconds(); 
    return fill(h) + ':' + fill(m) + ':' + fill(s);

    function fill(v) {
      return v < 10 ? '0' + v : v;
    }
  }

  exports.getTimeHHMMSS = getTimeHHMMSS;
}

// moved from /node_modules/utils.js
(function(){

  function sign( a ) { 
    return a < 0 ? -1 : (a > 0 ? 1 : 0);
  }

  exports.sign = sign;

})();

