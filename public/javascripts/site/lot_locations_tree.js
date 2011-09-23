Exchange.LotLocationsTree = Ext.extend(Exchange.GeneralTree, {
  border:true,

  initComponent: function() {
    this.dataName  = 'locations';
    Ext.apply(this, {
      rootVisible: false,
      animate:false,
      loader: new Ext.tree.TreeLoader(), // Note: no dataurl, register a TreeLoader to make use of createNode()
      lines: true,
      border: false,
      autoScroll: true,
      useArrows: true,
    });

    this.on('click', this.selectLocation);
    Exchange.LotLocationsTree.superclass.initComponent.apply(this, arguments);
  },

  onRender:function() {
    Exchange.LotLocationsTree.superclass.onRender.apply(this, arguments);
  },
  
  selectLocation: function(node,e) {
     $('lot_location_title').value = node.text;
  }
});