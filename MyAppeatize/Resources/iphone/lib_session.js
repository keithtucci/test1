var svc_remote = require("svc_remote");

exports.VerifySession = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    var Service = "session.cfc?method=VerifySession&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        Xid: Xid
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
    svc_remote.doService(_args);
};

exports.SetLocation = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    var Service = "session.cfc?method=SetLocation&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        LocationId: _args.LocationId,
        Xid: Xid
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
    svc_remote.doService(_args);
};