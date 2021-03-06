/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/


(function(){
  
  function Factory() {
    
    var map = {};
    
    this.create = function( name, controller ) {
      var Constructor = map[name];
      
      if (!Constructor) {
        console.log( 'Factory method not found: ', name );
        return null;
      }
      
      return new Constructor( controller, this );
    };
  
    this.register = function( name, constructor ) {
      map[name] = constructor;
    };
    
    this.isRegistererd = function( name ) {
      return map[name];
    };
  }
  
  exports.Factory = Factory;

})();