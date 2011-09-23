Exchange.LotProductsWindow = Ext.extend(Ext.Window, {
  initComponent : function() {
     productsTree = new Exchange.LotProductsTree({whereId : this.whereId, parentWindow : this });
     
     this.productsTree = productsTree;
     this.productsTree.on('click', this.closeWindow);
     
     this.expandAllButton = new Ext.Button({
       text: 'Развернуть', handler : function() { productsTree.expandAll(); }
     });
     
     this.collapseButton = new Ext.Button({
       text: 'Свернуть', handler : function() { productsTree.collapseAll(); }
     });
     
     Ext.apply(this, {
       width: 600,
       height: 400,
       maximizable : true,
       tbar : [ this.expandAllButton, this.collapseButton ],
       closeAction: 'hide',
       bodyStyle: 'background:white;',
       autoScroll: true,
       
       items: [
         this.productsTree  
       ] 
     });
     Exchange.LotProductsWindow.superclass.initComponent.apply(this, arguments);
  },
  closeWindow : function() {
    this.parentWindow.hide();
  }
});
