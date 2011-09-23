Admin.LocationsPage = Ext.extend(Ext.Viewport, {
  border: false,

  initComponent:function() {
    this.locationsTree = new Admin.LocationsTree({region: 'west', split: true});
    this.locationsTree.on('click', this.chooseLocation);
    this.locationsTree.addButton.locationsTree = this.locationsTree;
    this.locationsTree.addButton.handler       = this.addLocation;

    Ext.apply(this, {
      layout: 'border',
      items: [
      this.locationsTree,
      new Ext.Panel({ region: 'center', split: true, contentEl: 'content'}),
        { xtype: 'navbar', region: 'north' }
      ]
    });
    Admin.LocationsPage.superclass.initComponent.apply(this, arguments);
  },

  onRender: function() {
    Admin.LocationsPage.superclass.onRender.apply(this, arguments);
  },

  postInit: function() {
  },

  chooseLocation:function(node,e){
    callToRemote('/admin/locations/edit/' + node.id);
  },

  addLocation: function(button,e) {
    node = this.locationsTree.selModel.selNode;
    if(node) {
      document.location = '/admin/locations/add/' + node.id;
    } else {
      document.location = '/admin/locations/add/' + this.locationsTree.getRootNode().id;
    }
  }
});