Admin.ProductsPage = Ext.extend(Ext.Viewport, {
  border: false,

  initComponent:function() {
    this.productsTree = new Admin.ProductsTree({region: 'west', split: true});

    this.productsTree.on('click', this.chooseProducts);
    this.productsTree.addButton.productsTree = this.productsTree;
    this.productsTree.addButton.handler      = this.addProduct;


    Ext.apply(this, {
      layout: 'border',
      items: [
      this.productsTree,
      new Ext.Panel({ region: 'center', split: true, contentEl: 'content'}),
        { xtype: 'navbar', region: 'north' }
      ]
    });
    Admin.ProductsPage.superclass.initComponent.apply(this, arguments);
  },

  onRender: function() {
    Admin.ProductsPage.superclass.onRender.apply(this, arguments);
  },

  postInit: function() {
    this.productsTree.expandAll();
  },

  chooseProducts:function(node,e){
    callToRemote('/admin/products/edit/' + node.id);
  },

  addProduct: function(button,e) {
    node = this.productsTree.selModel.selNode;
    if(node) {
      document.location = '/admin/products/add/' + node.id;
    } else {
      document.location = '/admin/products/add/' + this.productsTree.getRootNode().id;
    }
  }
});
