Admin.LocationsTree = Ext.extend(Admin.GeneralTree, {
  border:true,

  initComponent: function() {
    
    this.addButton = new Ext.Toolbar.Button({
      text: 'Добавить',
      tooltip: 'Добавить'
    });

    
    this.dataName  = 'locations';

    Ext.apply(this, {
      rootVisible: true,
      animate:false,
      width: 300,
      tbar: [ this.addButton ],
      loader: new Ext.tree.TreeLoader(), // Note: no dataurl, register a TreeLoader to make use of createNode()
      lines: true,
      autoScroll: true
    });

    Admin.LocationsTree.superclass.initComponent.apply(this, arguments);
    this.getRootNode().text = 'Российская Федерация';
  },

  onRender:function() {
    Admin.LocationsTree.superclass.onRender.apply(this, arguments);
  }
});