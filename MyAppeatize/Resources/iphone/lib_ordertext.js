var svc_remote = require("svc_remote");

exports.GetOrderByLocation = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    if (null != Xid) {
        var LocationId = Ti.App.Properties.getString("LocationId") || 0;
        var Service = "ordertext.cfc?method=GetOrderByLocation&ReturnFormat=json";
        var HttpMethod = "POST";
        var oServiceArgs = {
            Xid: Xid,
            LocationId: LocationId,
            DtNow: _args.DtNow
        };
        _args.oServiceArgs = oServiceArgs;
        _args.Service = Service;
        _args.HttpMethod = HttpMethod;
        _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
        svc_remote.doService(_args);
    }
};

exports.GetOrderDetail = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    if (null != Xid) {
        var Service = "ordertext.cfc?method=GetOrderDetail&ReturnFormat=json";
        var HttpMethod = "POST";
        var oServiceArgs = {
            Xid: Xid,
            OrderId: _args.OrderId,
            DtNow: _args.DtNow
        };
        _args.oServiceArgs = oServiceArgs;
        _args.Service = Service;
        _args.HttpMethod = HttpMethod;
        _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
        svc_remote.doService(_args);
    }
};

exports.UpdateOrderStatus = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    if (null != Xid) {
        var Service = "ordertext.cfc?method=UpdateOrderStatus&ReturnFormat=json";
        var HttpMethod = "POST";
        var oServiceArgs = {
            Xid: Xid,
            OrderId: _args.OrderId,
            IsDelete: _args.IsDelete
        };
        _args.oServiceArgs = oServiceArgs;
        _args.Service = Service;
        _args.HttpMethod = HttpMethod;
        _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
        svc_remote.doService(_args);
    }
};