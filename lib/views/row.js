/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
<om636/lib/
*/ 


(function(){
  
  function Row( controller ) {
    
    if (typeof controller !== 'undefined') {
      View.call( this, controller );
      this.buildComposite( this.factory );
    }

    this.pinLeft = function( left ) {
      View.prototype.pinLeft.call( this, left );
      if (this.bounds.right > this.bounds.left) {
        this.fillRight( this.bounds.left, this.bounds.width() );
      }
    };

    this.pinRight = function( right ) {
      View.prototype.pinRight.call( this, right );
      if (this.bounds.right > this.bounds.left) {
        this.fillRight( this.bounds.left, this.bounds.width() ); 
      }
    };
  }

  Row.prototype = new View();

  exports.Row = Row;

})();