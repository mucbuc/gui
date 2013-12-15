/* 
Written by: Mark Busenitz, om636.mucbuc@gmail.com
*/


if (typeof EventStream === 'undefined') {
  EventStream = require( 'eventstream' ).EventStream;
}

(function( EventStream ) {

  function RootController() {
    
    var model = null
      , instance = this;
    
    EventStream.call( this );

    this.__defineSetter__( 'model', function( m ) {
      if (model) {
        this.once( 'unload', setModel );
        this.emit( 'unload' );
      }
      else {
        setModel();
  	  }

      function setModel() {
        model = m;
        instance.emit( 'load' );
      }

    } );
  
    this.__defineGetter__( 'model', function() {
      return model;
    } );
  }

  RootController.prototype = new EventStream();
    
  function Controller( root, sub ) {
  
    for (method in RootController.prototype) {
      this[method] = root[method];
    }
    this.context = root.context;
    this.clientSize = root.clientSize;

    this.__defineGetter__( 'click', function() {
      return root.click;
    } );
    
    this.__defineSetter__( 'model', function( v ) {
      root.model[ sub ] = v;
      root.emit( 'update' );
    } );
    
    this.__defineGetter__( 'model', function() {
      return root.model[ sub ];
    } );
  }
  
  exports.RootController = RootController;
  exports.Controller = Controller;

})( EventStream );

