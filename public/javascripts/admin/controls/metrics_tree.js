Admin.MetricsTree = Ext.extend(Admin.GeneralTree, {
  border:true,

  initComponent: function() {
    
    this.dataName  = 'metrics';
    Ext.apply(this, {
      rootVisible: false,
      animate:false,
      width: 300,
      loader: new Ext.tree.TreeLoader(), // Note: no dataurl, register a TreeLoader to make use of createNode()
      lines: true,
      autoScroll: true
    });


    Admin.MetricsTree.superclass.initComponent.apply(this, arguments);
    this.getRootNode().text = 'Меры';
  },

  onRender:function() {
    Admin.MetricsTree.superclass.onRender.apply(this, arguments);
  }
});