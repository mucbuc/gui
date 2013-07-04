    
(function(){

   function PrettyFactory() {
  
    Factory.call( this );
    this.register( 'menuView', RowView );
    this.register( 'onClick', ClickRect );
    this.register( 'text', Label );
    this.register( 'icon', Icon );
    this.register( 'frame', Frame );
    this.register( 'button', LayerView );
    this.register( 'box', CheckBox );
    this.register( 'textbox', TextBox );
    this.register( 'segment', RowView );
    this.register( 'icon', Icon );
  }
  
  PrettyFactory.prototype = new Factory();
  
  exports.PrettyFactory = PrettyFactory;
  
})();
