Admin.UsersGrid = Ext.extend(Ext.grid.GridPanel, {
  PAGE_SIZE: 50,
  border:false,


  initComponent:function() {
    var store = new Ext.data.Store({
      url: '/admin/users/ajax_list_users',
      baseParams: {
        done : false
      },
      remoteSort: true,
      reader: new Ext.data.JsonReader({
        root: 'items',
        totalProperty: 'total'
      }, ['id', 'nick','email', 'created_at' ,'online'])
    });

    Ext.apply(this, {
      stripeRows: true,
      store: store,
      selModel: new Ext.grid.RowSelectionModel({singleSelect:true}),
      bodyBorder: false,
      columns: [
        { header: 'Псеводним',                 dataIndex: 'nick', sortable: true},
        { header: 'e-mail',                    dataIndex: 'email', sortable: true},
        { header: 'Создан',                    dataIndex: 'created_at', sortable: true},
        { header: 'Последнее действие',        dataIndex: 'online', sortable: true}
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
    Admin.UsersGrid.superclass.initComponent.apply(this, arguments);
  },

  onRender:function() {
    Admin.UsersGrid.superclass.onRender.apply(this, arguments);
  }
});