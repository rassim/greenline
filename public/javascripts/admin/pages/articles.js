Admin.ArticlesPage = Ext.extend(Ext.Viewport, {
  border: false,

  initComponent:function() {
    this.articlesTree = new Admin.ArticlesTree({region: 'west', split: true});

    this.articlesTree.on('click', this.chooseArticle);

    Ext.apply(this, {
      layout: 'border',
      items: [
      this.articlesTree,
      new Ext.Panel({ region: 'center', split: true, contentEl: 'content'}),
        { xtype: 'navbar', region: 'north' }
      ]
    });
    Admin.ArticlesPage.superclass.initComponent.apply(this, arguments);
  },

  onRender: function() {
    Admin.ArticlesPage.superclass.onRender.apply(this, arguments);
  },

  postInit: function() {
    this.articlesTree.expandAll();
  },

  chooseArticle:function(node,e){
    callToRemote('/admin/articles/edit/' + node.id);
  }
});
