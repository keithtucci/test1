var svc_remote = require("svc_remote");

exports.InsertToken = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    Ti.App.id;
    var Service = "push.cfc?method=InsertToken&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        Xid: Xid,
        Token: _args.Token
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceAppUrl;
    svc_remote.doService(_args);
};