Admin.MessagesPage = Ext.extend(Ext.Viewport, {
  border: false,

  initComponent:function() {
    this.messagesGrid = new Admin.MessagesGrid({region:'north', split: true, height: 300});
    Ext.apply(this, {
      layout: 'border',
      items: [
        new Ext.Panel({ 
          items: [
            this.messagesGrid,
            new Ext.Panel({ items: null, region: 'center', split : true, contentEl:'content', autoScroll : true})
          ], 
          region: 'center', split : true, layout : 'border'
        }),
        new Admin.NavBar()
      ]
    });

    this.messagesGrid.store.load();
    this.messagesGrid.on( 'rowclick', this.selectMessage);
    Admin.MessagesPage.superclass.initComponent.apply(this, arguments);
  },

  onRender:function() {
    Admin.MessagesPage.superclass.onRender.apply(this, arguments);
  },

  postInit: function() {
  },

  selectMessage: function(grid, index, e) {
    lotId = grid.getSelectionModel().getSelected().data.id;
    callToRemote('/admin/messages/edit/' + lotId );
  }
});
