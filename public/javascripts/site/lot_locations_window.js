Exchange.LotLocationsWindow = Ext.extend(Ext.Window, {
  initComponent : function() {
     locationsTree = new Exchange.LotLocationsTree({whereId : this.whereId, parentWindow : this });
     this.locationsTree = locationsTree ;
     this.locationsTree.on('click', this.closeWindow);
    
     this.expandAllButton = new Ext.Button({
       text: 'Развернуть', handler : function() { 
         locationsTree.getRootNode().eachChild( function(n, args) {
           n.expand(false);
         });
       }
     });
     
     this.collapseAllButton = new Ext.Button({
       text: 'Свернуть', handler : function() { this.locationsTree.collapseAll(); }
     });
     
     Ext.apply(this, {
       width: 600,
       height: 400,
       closeAction: 'hide',
       maximizable : true,
       bodyStyle: 'background:white;',
       tbar : [ this.expandAllButton, this.collapseAllButton ],
       autoScroll: true,
       
       items: [
         this.locationsTree  
       ] 
     });
     Exchange.LotLocationsWindow.superclass.initComponent.apply(this, arguments);
  },
  closeWindow : function() {
    this.parentWindow.hide();
  }
});
