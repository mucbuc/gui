(function(){
  
  function Button( controller ) {
    
    View.call( this, controller, this.factory );
  }
  
  Button.prototype = new View();
  
  exports.Button = Button;

})();

