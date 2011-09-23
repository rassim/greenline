Admin.SettingsTree = Ext.extend(Admin.GeneralTree, {
  border:true,

  initComponent: function() {
    this.dataName  = 'settings';

    Ext.apply(this, {
      rootVisible: false,
      animate:false,
      width: 300,
      loader: new Ext.tree.TreeLoader(), // Note: no dataurl, register a TreeLoader to make use of createNode()
      lines: true,
      autoScroll: true
    });

    Admin.SettingsTree.superclass.initComponent.apply(this, arguments);
    this.getRootNode().text = 'Настройки торгов';
  },

  onRender:function() {
    Admin.SettingsTree.superclass.onRender.apply(this, arguments);
  }
});