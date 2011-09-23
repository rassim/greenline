Admin.UsersPage = Ext.extend(Ext.Viewport, {
  border: false,

  initComponent:function() {
    this.usersGrid = new Admin.UsersGrid({region:'north', split: true, height: 300});
    Ext.apply(this, {
      layout: 'border',
      items: [
        new Ext.Panel({ 
          items: [
            this.usersGrid,
            new Ext.Panel({ items: null, region: 'center', split : true, contentEl:'content', autoScroll : true})
          ], 
          region: 'center', split : true, layout : 'border'
        }),
        new Admin.NavBar()
      ]
    });

    this.usersGrid.store.load();
    this.usersGrid.on( 'rowclick', this.selectUser);
    Admin.UsersPage.superclass.initComponent.apply(this, arguments);
  },

  onRender:function() {
    Admin.UsersPage.superclass.onRender.apply(this, arguments);
  },

  postInit: function() {
  },

  selectUser: function(grid, index, e) {
    userId = grid.getSelectionModel().getSelected().data.id;
    callToRemote('/admin/users/edit/' + userId );
  }
});
