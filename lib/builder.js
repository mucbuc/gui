/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/

if (typeof Controller === 'undefined') {
  Controller = require( './controller' ).Controller;
}

(function(Controller) {
  
  function Builder( factory ) {

    this.buildComposite = function( controller, type ) {
      if (controller.model instanceof Array) {
        return this.buildArray( type, controller );
      }  
      else if (typeof type !== 'undefined') {
        return this.buildComponent( type, controller );
      }
      return this.buildObject( controller );
    }; 

    this.buildObject = function( controller ) {
      var product = {};
      for (var property in controller.model) {
        var sub = new Controller( controller, property );
        product[property] = this.buildComposite( sub, property );
      }
      return product;
    };

    this.buildArray = function( type, controller ) {
      var product = []
        , instance = this;
      controller.model.forEach( function(element, index) {
        var sub = new Controller( controller, index )
          , component = instance.buildComponent( type, sub );
        product.push( component );
      } );
      return product;
    };

    this.buildComponent = function( type, controller ) {
      var product = factory.create( type, controller );
      return product;
    };
  }

  exports.Builder = Builder;
  
})(Controller);