Exchange.LotProductsTree = Ext.extend(Exchange.GeneralTree, {
  border:true,

  initComponent: function() {
    this.dataName  = 'products';
    Ext.apply(this, {
      rootVisible: false,
      animate:false,
      loader: new Ext.tree.TreeLoader(), // Note: no dataurl, register a TreeLoader to make use of createNode()
      lines: true,
      border: false,
      autoScroll: true,
      useArrows: true,
    });

    Exchange.LotProductsTree.superclass.initComponent.apply(this, arguments);
    this.on('click', this.selectProduct);
    this.getRootNode().text = 'Каталог товаров';
  },

  onRender:function() {
    Exchange.LotProductsTree.superclass.onRender.apply(this, arguments);
  },
  
  selectProduct: function(node,e) {
    $('lot_product_title').value = node.text;
  }
});