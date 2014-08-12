var svc_remote = require('svc_remote');

var svc_remote = require('svc_remote');

exports.CommitAccount = function(_args) {
	var oApp = Ti.App.Properties.getObject('oApp'), Xid = Ti.App.Properties.getObject('Xid');
	var LoginId = _args.LoginId || 0, IsActive = _args.IsActive || true, FirstName = _args.FirstName || '', LastName = _args.LastName || '', Xid = _args.Xid || '';
	var Service = 'account.cfc?method=CommitAccount&ReturnFormat=json';
	var HttpMethod = 'POST';
	var oServiceArgs = {
		Xid : Xid,
		AppId : oApp.AppId,
		CorpId : oApp.CorpId,
		LoginId : LoginId,
		FirstName : FirstName,
		LastName : LastName,
		Email : _args.Email,
		Password : _args.Password,
		IsActive : IsActive
	};
	_args.oServiceArgs = oServiceArgs;
	_args.Service = Service;
	_args.HttpMethod = HttpMethod;
	_args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceAppUrl;
	svc_remote.doService(_args);
};

exports.RequestReset = function(_args) {
	var oApp = Ti.App.Properties.getObject('oApp');
	var DeviceKey = Ti.Platform.id, DeviceName = Ti.Platform.model + ' (' + Ti.Platform.username + ')';
	var Service = 'account.cfc?method=RequestReset&ReturnFormat=json';
	var HttpMethod = 'POST';
	var oServiceArgs = {
		AppId : oApp.AppId,
		Email : _args.Email,
		DeviceKey : DeviceKey,
		DeviceName : DeviceName,
	};
	_args.oServiceArgs = oServiceArgs;
	_args.Service = Service;
	_args.HttpMethod = HttpMethod;
	_args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceAppUrl;
	svc_remote.doService(_args);
}; 

exports.ProcessReset = function(_args) {
	var oApp = Ti.App.Properties.getObject('oApp');
	var DeviceKey = Ti.Platform.id;
	var Service = 'account.cfc?method=ProcessReset&ReturnFormat=json';
	var HttpMethod = 'POST';
	var oServiceArgs = {
		ResetXid : _args.ResetXid,
		DeviceKey : DeviceKey,
		Password : _args.Password,
	};
	_args.oServiceArgs = oServiceArgs;
	_args.Service = Service;
	_args.HttpMethod = HttpMethod;
	_args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceAppUrl;
	svc_remote.doService(_args);
}; 