(function(){
  
  function Row( controller ) {
    
    View.call( this, controller );

    this.buildComposite( this.factory );

    this.pinLeft = function( left ) {
      Row.prototype.pinLeft.call( this, left );

      if (this.bounds.width() > 0) {
        this.floatRight( left, this.bound.width() );
      }
    };

    this.pinRight = function( right ) {
      Row.prototype.pinRight.call( this, right );
      
      if (this.bounds.width() > 0) {
        this.floatLeft( right, this.bounds.width() )
      }
    };
  }

  Row.prototype = new View();

  exports.Row = Row;

})();