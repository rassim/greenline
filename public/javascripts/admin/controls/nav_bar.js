Admin.NavBar = Ext.extend(Ext.Toolbar, {

  initComponent:function() {
    Ext.apply(this, {
      region: 'north',
      border: false,
      height: 28,
      items: [
        {
          text: 'Лоты',
          pressed: controllerInfo.section == "lots",
          handler: function() { document.location = "/admin/lots"; } 
        },
        new Ext.Toolbar.SplitButton({
          text: 'Участники',
          pressed: controllerInfo.section == "users",
          handler: function() { document.location = "/admin/users"; },
          menu: [
            { text: 'Добавить участника', handler: function() { callToRemote("/admin/users/add")}}
          ]
        }),
        {
          text: 'Сообщения',
          pressed: controllerInfo.section == "messages",
          handler: function() { document.location = "/admin/messages"; }
        },
        {
          text: 'Тексты на сайте',
          pressed: controllerInfo.section == "articles",
          handler: function() { document.location = "/admin/articles"; }
        },
        { 
          text: 'Каталог продуктов',
          pressed: controllerInfo.section == "products",
          handler: function() { document.location = "/admin/products"; }
        },
        new Ext.Toolbar.SplitButton({
          text: 'Единицы измерения',
          pressed: controllerInfo.section == "metrics",
          handler: function() { document.location = "/admin/metrics"; },
          menu : [
            { text : 'Добавить меру', handler : function() { document.location = "/admin/metrics/add";}}
          ]
        }),
        {
          text: 'Настройки торгов', 
          pressed: controllerInfo.section == "settings",
          handler : function() { document.location = "/admin/settings"; }
        },
        { 
          text: 'География',
          handler: function() { document.location = "/admin/locations"; },
          pressed: controllerInfo.section == 'locations', 
        }
      ]    
    });
    Admin.NavBar.superclass.initComponent.apply(this, arguments);
  },    

  onRender:function() {
    Admin.NavBar.superclass.onRender.apply(this, arguments);
  }
});

Ext.reg('navbar', Admin.NavBar);