var svc_remote = require("svc_remote");

exports.GetMenuList = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    var LocationId = Ti.App.Properties.getString("LocationId") || 0;
    var Service = "admingetmenu.cfc?method=GetMenuList&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        Xid: Xid,
        LocationId: LocationId
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
    svc_remote.doService(_args);
};

exports.GetReadOnlyMenu = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    var Service = "admingetmenu.cfc?method=GetReadOnlyMenu&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        Xid: Xid,
        MenuId: _args.MenuId
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
    svc_remote.doService(_args);
};

exports.GetMenuGroup = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    var Service = "admingetmenu.cfc?method=GetMenuGroup&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        Xid: Xid,
        MenuId: _args.MenuId
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
    svc_remote.doService(_args);
};

exports.GetMenuItem = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    var Service = "admingetmenu.cfc?method=GetMenuItem&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        Xid: Xid,
        MenuTextId: _args.MenuTextId
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
    svc_remote.doService(_args);
};

exports.ReorderMenuText = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    var Service = "adminsetmenu.cfc?method=ReorderMenuText&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        Xid: Xid,
        MenuId: _args.MenuId,
        MenuTextTypeCode: _args.MenuTextTypeCode,
        IdList: _args.IdList
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
    Ti.API.info(_args);
    svc_remote.doService(_args);
};

exports.ModifyMenuItem = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    var LocationId = Ti.App.Properties.getString("LocationId");
    var Service = "adminsetmenu.cfc?method=ModifyMenuItem&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        Xid: Xid,
        LocationId: LocationId,
        MenuTextTypeCode: _args.MenuTextTypeCode,
        MenuId: _args.MenuId,
        ParentMenuTextId: _args.ParentMenuTextId,
        MenuTextId: _args.MenuTextId,
        Name: _args.Name,
        Descr: _args.Descr,
        Price: _args.Price,
        PriceText: _args.PriceText,
        IsActive: _args.IsActive
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
    Ti.API.info(_args);
    svc_remote.doService(_args);
};