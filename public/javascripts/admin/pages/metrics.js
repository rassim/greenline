Admin.MetricsPage = Ext.extend(Ext.Viewport, {
  border: false,

  initComponent:function() {
    this.metricsTree = new Admin.MetricsTree({region: 'west', split: true});
    this.metricsTree.on('click', this.chooseMetric);
  
    Ext.apply(this, {
      layout: 'border',
      items: [
      this.metricsTree,
      new Ext.Panel({ region: 'center', split: true, contentEl: 'content'}),
        { xtype: 'navbar', region: 'north' }
      ]
    });
    Admin.MetricsPage.superclass.initComponent.apply(this, arguments);
  },

  onRender: function() {
    Admin.MetricsPage.superclass.onRender.apply(this, arguments);
  },

  postInit: function() {
    this.metricsTree.expandAll();
  },

  chooseMetric:function(node,e){
    callToRemote('/admin/metrics/edit/' + node.id);
  }
});