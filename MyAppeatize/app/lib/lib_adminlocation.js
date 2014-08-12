var svc_remote = require('svc_remote');

exports.GetAdminLocation = function(_args) {
	var Xid = Ti.App.Properties.getString('Xid');
	if (Xid != null) {
		var LocationId = Ti.App.Properties.getString('LocationId') || 0;
		var Service = 'adminlocation.cfc?method=GetAdminLocation&ReturnFormat=json';
		var HttpMethod = 'POST';
		var oServiceArgs = {
			Xid : Xid,
			LocationId : LocationId,
		};
		//alert(AppNamespace);
		_args.oServiceArgs = oServiceArgs;
		_args.Service = Service;
		_args.HttpMethod = HttpMethod;
		_args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
		svc_remote.doService(_args);
	}
};
