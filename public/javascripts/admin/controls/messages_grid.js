Admin.MessagesGrid = Ext.extend(Ext.grid.GridPanel, {
  PAGE_SIZE: 50,
  border:false,


  initComponent:function() {
    var store = new Ext.data.Store({
      url: '/admin/messages/ajax_list_messages',
      baseParams: {
        done : false
      },
      remoteSort: false,
      reader: new Ext.data.JsonReader({
        root: 'items',
        totalProperty: 'total'
      }, ['id', 'date', 'from', 'to', 'subject'])
    });

    Ext.apply(this, {
      stripeRows: true,
      store: store,
      selModel: new Ext.grid.RowSelectionModel({singleSelect:true}),
      bodyBorder: false,
      columns: [
        { header: 'Дата создания', dataIndex: 'date',         sortable: false },
        { header: 'Автор',         dataIndex: 'from',         sortable: false },
        { header: 'Получатель',    dataIndex: 'to',           sortable: false },
        { header: 'Тема',          dataIndex: 'subject',      sortable: false }
      ],
      view: new Ext.grid.GridView({
        forceFit: true,
        autoFill: true
      }),
      
      bbar: new Ext.PagingToolbar({
        pageSize: this.PAGE_SIZE,
        store: store,
        displayInfo: true,
        displayMsg: '{0}—{1} из {2}',
        emptyMsg: ''
      })
    });
    Admin.MessagesGrid.superclass.initComponent.apply(this, arguments);
  },

  onRender:function() {
    Admin.MessagesGrid.superclass.onRender.apply(this, arguments);
  }
});