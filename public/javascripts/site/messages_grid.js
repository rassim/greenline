Exchange.MessagesGrid = Ext.extend(Ext.grid.GridPanel, {
  PAGE_SIZE: 50,
  border:false,


  initComponent:function() {
    var store = new Ext.data.Store({
      url: this.dataUrl,
      baseParams: {
        done : false
      },
      remoteSort: false,
      reader: new Ext.data.JsonReader({
        root: 'items',
        totalProperty: 'total'
      }, ['id', 'date', 'from', 'subject'])
    });

    Ext.apply(this, {
      stripeRows: true,
      store: store,
      height: '300',
      width: '700',
      selModel: new Ext.grid.RowSelectionModel({singleSelect:true}),
      bodyBorder: false,
      columns: [
        { header: 'Автор',         dataIndex: 'from',         sortable: false, width: 80 },
        { header: 'Тема',          dataIndex: 'subject',      sortable: false },
        { header: 'Дата создания', dataIndex: 'date',         sortable: false, width: 50 }
      ],
      view: new Ext.grid.GridView({
        autoFill: true
      }),
      renderTo: 'messages-list',
      bbar: new Ext.PagingToolbar({
        pageSize: this.PAGE_SIZE,
        store: store,
        displayInfo: true,
        displayMsg: '{0}—{1} из {2}',
        emptyMsg: ''
      })
    });
    Exchange.MessagesGrid.superclass.initComponent.apply(this, arguments);
  },

  onRender:function() {
    Exchange.MessagesGrid.superclass.onRender.apply(this, arguments);
  }
});
