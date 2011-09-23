Admin.LotsPage = Ext.extend(Ext.Viewport, {
  border: false,

  initComponent:function() {
    this.lotsGrid = new Admin.LotsGrid({region:'north', split: true, height: 300});
    Ext.apply(this, {
      layout: 'border',
      items: [
        new Ext.Panel({ 
          items: [
            this.lotsGrid,
            new Ext.Panel({ items: null, region: 'center', split : true, contentEl:'content', autoScroll : true})
          ], 
          region: 'center', split : true, layout : 'border'
        }),
        new Admin.NavBar()
      ]
    });

    this.lotsGrid.store.load();
    this.lotsGrid.on( 'rowclick', this.selectLot);
    Admin.LotsPage.superclass.initComponent.apply(this, arguments);
  },

  onRender:function() {
    Admin.LotsPage.superclass.onRender.apply(this, arguments);
  },

  postInit: function() {
  },

  selectLot: function(grid, index, e) {
    lotId = grid.getSelectionModel().getSelected().data.id;
    callToRemote('/admin/lots/edit/' + lotId );
  }
});
