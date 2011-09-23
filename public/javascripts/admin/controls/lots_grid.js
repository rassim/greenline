Admin.LotsGrid = Ext.extend(Ext.grid.GridPanel, {
  PAGE_SIZE: 50,
  border:false,


  initComponent:function() {
    var store = new Ext.data.Store({
      url: '/admin/lots/ajax_list_lots',
      baseParams: {
        done : false
      },
      remoteSort: false,
      reader: new Ext.data.JsonReader({
        root: 'items',
        totalProperty: 'total'
      }, ['id', 'date', 'user', 'description'])
    });

    Ext.apply(this, {
      stripeRows: true,
      store: store,
      selModel: new Ext.grid.RowSelectionModel({singleSelect:true}),
      bodyBorder: false,
      columns: [
        { header: 'Номер',         dataIndex: 'id',           sortable: false },
        { header: 'Дата создания', dataIndex: 'date',         sortable: false },
        { header: 'Владелец',      dataIndex: 'user',         sortable: false },
        { header: 'Описание',      dataIndex: 'description',  sortable: false }
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
    Admin.LotsGrid.superclass.initComponent.apply(this, arguments);
  },

  onRender:function() {
    Admin.LotsGrid.superclass.onRender.apply(this, arguments);
  }
});