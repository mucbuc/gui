(function(){
  
  function Button( controller ) {

    View.call( this, controller, this.factory );
 /*
  	this.layoutVertical = function( top ) {
	
      for (component in this.composite) {
        this.composite[component].bounds.size = this.bounds.size;
        this.composite[component].layoutVertical( top );
      }
      return View.prototype.layoutVertical.call( this, top );
    };

    this.layoutHorizontal = function( left ) {
	
      for (component in this.composite) {
        //this.composite[component].bounds.size = this.bounds.size;
        this.composite[component].layoutHorizontal( left );
      }
      return View.prototype.layoutHorizontal.call( this, left );
    };
*/
  }
  
  Button.prototype = new View();
  
  exports.Button = Button;

})();

