var lib_account = require('lib_account'), lib_accountadmin = require('lib_accountadmin'), lib_login = require('lib_login'), lib_common = require('lib_common'), lib_alert = require('lib_alert'), animation = require('alloy/animation');
var args = arguments[0] || {}, Type = args.Type;

//$.win.title = args.NavBarTitle;

if (Type == 'login')
	showLogIn();
else
	showSignUp();

function closeWin() {
	$.win.close({
		animated : true
	});
}

function showSignUp() {
	//$.viewData.enabled = false;
	Ti.API.info('showSignUp');
	Type = 'signup';
	var Title = 'Sign Up';
	$.buttonLogIn.visible = false;
	$.viewForgotPassword.visible = false;
	$.buttonSignUp.visible = true;
	$.buttonSignInUpAction.title = Title;
	$.win2.title = Title;
	//$.viewData.enabled = true;
}

function showLogIn() {
	//$.viewData.enabled = false;
	Ti.API.info('showLogIn');
	Type = 'login';
	var Title = 'Log In';
	$.buttonSignUp.visible = false;
	$.viewForgotPassword.visible = true;
	$.buttonLogIn.visible = true;
	$.buttonSignInUpAction.title = Title;
	$.win2.title = Title;
	//$.viewData.enabled = true;
}

function doForgotPassword() {
	var IsValid = true, Email = $.textfieldEmail.value;
	if (IsValid && Email.length == 0) {
		IsValid = false;
		var MessageTitle = 'Email Required', Message = 'Please enter an email address.';
		lib_alert.showAlert(Message, MessageTitle);
	}
	if (IsValid) {
		RequestReset(Email);
	}
}

function textfieldEmail_return(e) {
	$.textfieldPassword.focus();
}

function textfieldPassword_return(e) {
	doValidate();
}

function Login(Email, Password) {
	showLoading();
	var oArgs = {
		Email : Email,
		Password : Password,
		IsKeepLogged : true,
		Callback : 'signinup.login_success',
		ErrorCallback : 'signinup.login_error'
	};
	lib_login.Login(oArgs);
}

function PostLogin() {
	showLoading();
	var oArgs = {
		Callback : 'signinup.postlogin_success',
		ErrorCallback : 'signinup.postlogin_error'
	};
	lib_accountadmin.PostLogin(oArgs);
}

function CommitAccount(Email, Password) {
	showLoading();
	var oArgs = {
		Email : Email,
		Password : Password,
		Callback : 'signinup.commitaccount_success',
		ErrorCallback : 'signinup.commitaccount_error'
	};
	lib_account.CommitAccount(oArgs);
}

function RequestReset(Email) {
	showLoading();
	var oArgs = {
		Email : Email,
		Callback : 'signinup.requestreset_success',
		ErrorCallback : 'signinup.requestreset_error'
	};
	lib_account.RequestReset(oArgs);
}

function doValidate() {
	var IsValid = true, Email = $.textfieldEmail.value, Password = $.textfieldPassword.value;
	if (IsValid && Email.length == 0) {
		IsValid = false;
		var MessageTitle = 'Email Required', Message = 'Please enter an email address.';
		lib_alert.showAlert(Message, MessageTitle);
	}
	if (IsValid && Password.length == 0) {
		IsValid = false;
		var MessageTitle = 'Password Required', Message = 'Please enter a password.';
		lib_alert.showAlert(Message, MessageTitle);
	}
	if (IsValid) {
		if (Type == 'signup')
			CommitAccount(Email, Password);
		else if (Type == 'login')
			Login(Email, Password);
	}
}

function requestreset_success(e) {
	Ti.API.info(e);
	hideLoading();
	//Ti.App.fireEvent('startc.opennext');
	closeWin();
	var MessageTitle = 'You\'ve Got Mail', Message = 'Check your email momentarily for the password reset link.', MessageButtonTitle = 'OK, I Will';
	lib_alert.showAlert(Message, MessageTitle);
}

function requestreset_error(e) {
	Ti.API.info(e);
	hideLoading();
}

function commitaccount_success(e) {
	Ti.API.info(e);
	hideLoading();
	var oData = e.oData, Xid = oData.Xid;
	Ti.App.Properties.setString('Xid', Xid);
	Ti.App.fireEvent('startc.opennext');
	closeWin();
}

function commitaccount_error(e) {
	Ti.API.info(e);
	hideLoading();
}

function login_success(e) {
	Ti.API.info(e);
	hideLoading();
	var oData = e.oData, Xid = oData.Xid;
	Ti.App.Properties.setString('Xid', Xid);
	var Username = $.textfieldEmail.value;
	Ti.App.Properties.setString('Username', Username);
	// Ti.App.fireEvent('startc.opennext');
	// closeWin();
	PostLogin();
}

function login_error(e) {
	Ti.API.info(e);
	hideLoading();
}

function postlogin_success(e) {
	Ti.API.info(e);
	hideLoading();
	var oData = e.oData;
	//Ti.App.Properties.setString('Xid', Xid);
	//Ti.App.fireEvent('startc.opennext');
	//closeWin();
	var Locations = [], Controller = 'start1';
	var LocationId = oData.LocationId || 0;
	if (Locations.length > 0) {
		Controller = 'locations';
		//openLocations(Locations);
	} else {
		Ti.App.Properties.setString('LocationId', LocationId);
		Ti.App.fireEvent('company.initcontroller');
		Ti.App.fireEvent('menus.initcontroller');
		Ti.App.fireEvent('orders.initcontroller');
		//openStart();
	}
	Ti.App.fireEvent('startc.opennext', {
		Controller : Controller,
		LocationId : LocationId,
		Locations : Locations
	});
	closeWin();
}

function openLocations(Locations) {
	Ti.App.fireEvent('openLocations', {
		Locations : Locations
	});
}

function postlogin_error(e) {
	Ti.API.info(e);
	hideLoading();
}

function showLoading() {
	$.activityindicatorLoading.show();
	$.viewLoading.visible = true;
}

function hideLoading() {
	$.viewLoading.visible = false;
	$.activityindicatorLoading.hide();
}

function initController() {
	$.textfieldEmail.focus();
}

$.win.addEventListener('close', function() {
	Ti.App.removeEventListener('signinup.closewin', closeWin);
	Ti.App.removeEventListener('signinup.login_success', login_success);
	Ti.App.removeEventListener('signinup.login_error', login_error);
	Ti.App.removeEventListener('signinup.postlogin_success', postlogin_success);
	Ti.App.removeEventListener('signinup.postlogin_error', postlogin_error);
	Ti.App.removeEventListener('signinup.commitaccount_success', commitaccount_success);
	Ti.App.removeEventListener('signinup.commitaccount_error', commitaccount_error);
	Ti.App.removeEventListener('signinup.requestreset_success', requestreset_success);
	Ti.App.removeEventListener('signinup.requestreset_error', requestreset_error);
	$.destroy();
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('signinup.closewin', closeWin);
	Ti.App.addEventListener('signinup.login_success', login_success);
	Ti.App.addEventListener('signinup.login_error', login_error);
	Ti.App.addEventListener('signinup.postlogin_success', postlogin_success);
	Ti.App.addEventListener('signinup.postlogin_error', postlogin_error);
	Ti.App.addEventListener('signinup.commitaccount_success', commitaccount_success);
	Ti.App.addEventListener('signinup.commitaccount_error', commitaccount_error);
	Ti.App.addEventListener('signinup.requestreset_success', requestreset_success);
	Ti.App.addEventListener('signinup.requestreset_error', requestreset_error);
	initController();
});
