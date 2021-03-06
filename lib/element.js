/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
<om636/lib/
*/

(function(){

  function Element( controller ) {

    this.bounds = new Rect();

    this.pinLeft = function( left ) {
      this.bounds.left = left;
    };

    this.pinRight = function( right ) {
      this.bounds.right = right;
    };

    this.pinTop = function( top ) {
      this.bounds.top = top;
    };

    this.pinBottom = function( bottom ) {
      this.bounds.bottom = bottom;
    };

    this.calcAlignOffset = function() {
      if (controller.context.textAlign == 'center') {
        return this.bounds.width() * 0.5;
      }
      else if (controller.context.textAlign == 'right') {
        return this.bounds.width();
      }
      return 0;
    };
  }

  exports.Element = Element;

})();