var svc_remote = require('svc_remote');

exports.AppDetail = function(_args) {
	var AppNamespace = Ti.App.id;
	var Service = 'appeatize.cfc?method=AppDetail&ReturnFormat=json';
	var HttpMethod = 'POST';
	var oServiceArgs = {
		AppNamespace : AppNamespace
	};
	_args.oServiceArgs = oServiceArgs;
	_args.Service = Service;
	_args.HttpMethod = HttpMethod;
	_args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
	svc_remote.doService(_args);
};