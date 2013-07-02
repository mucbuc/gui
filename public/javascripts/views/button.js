(function(){
  
  function Button( controller ) {
    
    var instance = this;
    View.call( this, controller, instance.factory );
    
    this.layoutVertical = function( top ) {
      var bottom = View.prototype.layoutVertical.call( this, top );
      for (component in instance.composite) {
        instance.composite[component].bounds = instance.bounds;
      }
      return bottom;
    };

    this.layoutHorizontal = function( left ) {
      var right = View.prototype.layoutHorizontal.call( this, left );
      for (component in instance.composite) {
        instance.composite[component].bounds = instance.bounds;
      }
      return right;
    };
  }
  
  Button.prototype = new View();
  
  exports.Button = Button;

})();

