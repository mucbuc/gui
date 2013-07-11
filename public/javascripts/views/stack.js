(function(){
  
  function Stack( controller ) {
    
    View.call( this, controller );
    this.buildComposite( this.factory );
    
    this.floatHeight = 80;

    this.floatDown = function( top ) {
      Stack.prototype.pinTop.call( this, top );
      Stack.prototype.pinBottom.call( this, top + this.floatHeight );
      return this.floatHeight;
    };
  }

  Stack.prototype = new View();

  exports.Stack = Stack;

})();