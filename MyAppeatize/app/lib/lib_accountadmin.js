var svc_remote = require('svc_remote');

exports.PostLogin = function(_args) {
	var Xid = Ti.App.Properties.getString('Xid');
	var Service = 'accountadmin.cfc?method=PostLogin&ReturnFormat=json';
	var HttpMethod = 'POST';
	var oServiceArgs = {
		Xid : Xid
	};
	//alert(AppNamespace);
	_args.oServiceArgs = oServiceArgs;
	_args.Service = Service;
	_args.HttpMethod = HttpMethod;
	_args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
	svc_remote.doService(_args);
}; 