var svc_remote = require('svc_remote');

exports.Login = function(_args) {
	var oApp = Ti.App.Properties.getObject('oApp');
	var Service = 'login.cfc?method=Login&ReturnFormat=json';
	var HttpMethod = 'POST';
	var oServiceArgs = {
		AppId : oApp.AppId,
		Email : _args.Email,
		Password : _args.Password,
		IsKeepLogged : _args.IsKeepLogged
	};
	_args.oServiceArgs = oServiceArgs;
	_args.Service = Service;
	_args.HttpMethod = HttpMethod;
	_args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceAppUrl;
	svc_remote.doService(_args);
};