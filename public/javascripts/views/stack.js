/* 
Written by: Mark Busenitz, mbusenitz@gmail.com
This is the result for the Unknown Worlds GUIFramework design test.
*/ 


(function(){
  
  function Stack( controller ) {
    
    if (typeof controller !== 'undefined') {
      View.call( this, controller );
    }

    this.floatDown = function( top ) {
      Stack.prototype.pinTop.call( this, top );
      Stack.prototype.pinBottom.call( this, top + this.floatHeight );
      return this.floatHeight;
    };

    this.floatRight = function( left ) {
      Stack.prototype.pinLeft.call( this, left );
      Stack.prototype.pinRight.call( this, left + this.floatWidth );
      return this.floatWidth;
    };
  }

  Stack.prototype = new View();
  Stack.prototype.floatHeight = 50;

  exports.Stack = Stack;

})();