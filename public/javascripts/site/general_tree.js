Exchange.GeneralTree = Ext.extend(Ext.tree.TreePanel, {
  border:true,
  dataName: 'stuff',

  initComponent:function() {

    root = new Ext.tree.TreeNode({
      text: 'root',
      draggable:false,
      id: this.dataName,
      expanded: true
    });

    this.root = root;


    Ext.apply(this, {
      rootVisible: false,
      animate:false,
      root: root,
      enableDD: false,
      loader: new Ext.tree.TreeLoader(), // Note: no dataurl, register a TreeLoader to make use of createNode()
      lines: true,
      containerScroll: true
    });

    dataName = this.dataName;

    for(var i = 0; i < controllerInfo[dataName].length; i++) {
      root.appendChild(this.getLoader().createNode(controllerInfo[dataName][i]));
    }
    Exchange.GeneralTree.superclass.initComponent.apply(this, arguments);
  },


  onRender:function() {
    Exchange.GeneralTree.superclass.onRender.apply(this, arguments);
  }
});

