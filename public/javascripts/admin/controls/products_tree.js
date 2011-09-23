Admin.ProductsTree = Ext.extend(Admin.GeneralTree, {
  border:true,

  initComponent: function() {
    
    this.addButton = new Ext.Toolbar.Button({
      text: 'Добавить',
      tooltip: 'Добавить'
    });

    
    this.dataName  = 'products';
    Ext.apply(this, {
      rootVisible: true,
      animate:false,
      width: 300,
      tbar: [ this.addButton ],
      loader: new Ext.tree.TreeLoader(), // Note: no dataurl, register a TreeLoader to make use of createNode()
      lines: true,
      autoScroll: true
    });


    Admin.ProductsTree.superclass.initComponent.apply(this, arguments);
    this.getRootNode().text = 'Каталог товаров';
  },

  onRender:function() {
    Admin.ProductsTree.superclass.onRender.apply(this, arguments);
  }
});