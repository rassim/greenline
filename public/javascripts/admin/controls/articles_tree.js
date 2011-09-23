Admin.ArticlesTree = Ext.extend(Admin.GeneralTree, {
  border:true,

  initComponent: function() {
    this.dataName  = 'articles';

    Ext.apply(this, {
      rootVisible: false,
      animate:false,
      width: 300,
      loader: new Ext.tree.TreeLoader(), // Note: no dataurl, register a TreeLoader to make use of createNode()
      lines: true,
      autoScroll: true
    });

    Admin.ArticlesTree.superclass.initComponent.apply(this, arguments);
    this.getRootNode().text = 'Тексты на сайте';
  },

  onRender:function() {
    Admin.ArticlesTree.superclass.onRender.apply(this, arguments);
  }
});