Exchange.InterestsTree = Ext.extend(Exchange.GeneralTree, {
  border:true,

  initComponent: function() {
    this.dataName  = 'interests';
    Ext.apply(this, {
      rootVisible: false,
      animate:false,
      loader: new Ext.tree.TreeLoader(), // Note: no dataurl, register a TreeLoader to make use of createNode()
      lines: true,
      border: false,
      autoScroll: true,
      width: 520,
      height: 250,
      renderTo  : "interest-tree",
    });

    this.on('checkchange', this.setUserInterests);
    Exchange.InterestsTree.superclass.initComponent.apply(this, arguments);
  },

  onRender:function() {
    Exchange.InterestsTree.superclass.onRender.apply(this, arguments);
  },
  
  setUserInterests : function(node,e) {
    var checkedIds = "";
    Ext.each(this.getChecked(), function(node) {
      if (checkedIds.length > 0) { 
        checkedIds += "," 
      }
      checkedIds += node.id;
    });
    $(this.whereId).value = checkedIds;
  }
});