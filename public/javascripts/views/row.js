(function(){
  
  function Row( controller ) {
    
    View.call( this, controller );

    this.buildComposite( this.factory );

    this.pinLeft = function( left ) {
      Row.prototype.pinLeft.call( this, left );

      if (this.bounds.width() > 0) {
        this.floatLeft( this.bounds.right );
      }
    };

    this.pinRight = function( right ) {
      Row.prototype.pinRight.call( this, right );
      
      if (this.bounds.width() > 0) {
        this.floatRight( this.bounds.left ); 
      }
    };
  }

  Row.prototype = new View();

  exports.Row = Row;

})();