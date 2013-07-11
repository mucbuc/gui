(function(){
  
  function Stack( controller ) {
    
    View.call( this, controller );

    this.buildComposite( this.factory );
  }

  Stack.prototype = new View();

  exports.Stack = Stack;

})();