(function(){
  
  function Stack( controller ) {
    
    View.call( this, controller );
    this.buildComposite( this.factory );
    
    this.floatHeight = 50;

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

  exports.Stack = Stack;

})();