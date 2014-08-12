var svc_remote = require("svc_remote");

exports.GetLocation = function(_args) {
    var Service = "location.cfc?method=GetLocation&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        Xid: Alloy.CFG.oApp.Xid,
        LocationId: _args.LocationId,
        DateRequest: _args.DateRequest,
        TimeRequest: _args.TimeRequest
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
    svc_remote.doService(_args);
};

exports.GetLocationDetail = function(_args) {
    var Service = "location.cfc?method=GetLocationDetail&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        Xid: _args.Xid,
        LocationId: _args.LocationId,
        NextMethod: _args.NextMethod,
        NextDisplayCode: _args.NextDisplayCode,
        Id: _args.Id
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
    svc_remote.doService(_args);
};