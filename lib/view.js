/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/


if (typeof Builder === 'undefined') {
  Builder = require( 'builder' ).Builder;
}

(function(Builder) {
  
  function View( controller ) {

    var instance = this
      , elements; 

    Element.call( this, controller );

    this.buildComposite = function( factory ) {
      var builder = new Builder( factory );
      this.composite = builder.buildComposite( controller );
      elements = null;
    };

    this.forEach = function( f ) {
      this.elements.forEach( function( element, index ) {
        f( element, index );
      });
    };

   this.pinLeft = function( left ) {
      View.prototype.pinLeft.call( this, left );
      this.forEach( function( element) {
        element.pinLeft( left );
      } );
    };

    this.pinRight = function( right ) {
      View.prototype.pinRight.call( this, right );
      this.forEach( function( element ) { 
        element.pinRight( right );
      });
    };

    this.pinTop = function( top ) {
      View.prototype.pinTop.call( this, top );
      this.forEach( function( element ) { 
        element.pinTop( top );
      });
    };

    this.pinBottom = function( bottom ) {
      View.prototype.pinBottom.call( this, bottom );
      this.forEach( function( element ) { 
        element.pinBottom( bottom );
      });
    };

    this.fillRight = function( left, width ) {

      View.prototype.pinLeft.call( this, left );
      View.prototype.pinRight.call( this, left + width );

      this.forEach( function( element, index ) {
        element.pinLeft( left );
        
        var w; 
        if (element.bounds.right > element.bounds.left) {
          w = element.bounds.width();
        }
        else if (typeof element.floatWidth !== 'undefined') {
          w = element.floatWidth;
        }
        else {
          var currentWidth = left - instance.bounds.left;
          w = (width - currentWidth) / (instance.elements.length - index);
        }

        element.pinRight( left += w );
      });
    };

    this.fillDown = function( top, height ) {

      View.prototype.pinTop.call( this, top );
      View.prototype.pinBottom.call( this, top + height );

      this.forEach( function( element, index ) {
        
        var h; 
        element.pinTop( top );
        if (element.bounds.bottom > element.bounds.top) {
          h = element.bounds.height();
        }
        else {
          var currentHeight = top - instance.bounds.top;
          h = (height - currentHeight) / (instance.elements.length - index);
        }
        element.pinBottom( top += h );
      });
    };

    this.floatRight = function( left ) {
      var width = 0;
      this.forEach( function( element ) {
        width += element.floatRight( left + width );
      });
      View.prototype.pinLeft.call( this, left );
      View.prototype.pinRight.call( this, left + width );
      return width;
    };

    this.floatDown = function( top ) {
      var height = 0; 
      this.forEach( function( element ) {
        height += element.floatDown( top + height );
      });
      View.prototype.pinTop.call( this, top );
      View.prototype.pinBottom.call( this, top + height );
      return height;
    };

    this.__defineGetter__( 'elements', function() {
      if (elements) {
        return elements;
      }
      elements = [];
      for (var type in this.composite) {
        var component = this.composite[type];
        if (component instanceof Array) {
          component.forEach( function( element ) {
            elements.push( element );

         } );
        } 
        else {
          elements.push( component );
        }
      }
      return elements;
    } );
  }

  View.prototype = new Element();

  exports.View = View;

})(Builder);
