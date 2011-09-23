Admin.SettingsPage = Ext.extend(Ext.Viewport, {
  border: false,

  initComponent:function() {
    this.settingsTree = new Admin.SettingsTree({region: 'west', split: true});

    this.settingsTree.on('click', this.chooseSettings);

    Ext.apply(this, {
      layout: 'border',
      items: [
      this.settingsTree,
      new Ext.Panel({ region: 'center', split: true, contentEl: 'content'}),
        { xtype: 'navbar', region: 'north' }
      ]
    });
    Admin.SettingsPage.superclass.initComponent.apply(this, arguments);
  },

  onRender: function() {
    Admin.SettingsPage.superclass.onRender.apply(this, arguments);
  },

  postInit: function() {
    this.settingsTree.expandAll();
  },

  chooseSettings:function(node,e){
    callToRemote('/admin/settings/edit/' + node.id);
  }
});
