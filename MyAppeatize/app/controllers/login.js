var lib_accountadmin = require('lib_accountadmin'), lib_common = require('lib_common');
;

function closeWin() {
	$.win.close();
}

function openStart() {
	Ti.App.fireEvent('openStart');
}

function openLocations(Locations) {
	Ti.App.fireEvent('openLocations', {
		Locations : Locations
	});
}

function doValidate() {
	doBlur();
	//openStart();
	var IsValid = true;
	if (IsValid && $.textfieldUsername.value.length == 0) {
		IsValid = false;
		$.alertDialog.message = 'Oops, your Username is required to proceed.';
		$.alertDialog.show();
	}
	if (IsValid && $.textfieldPassword.value.length == 0) {
		IsValid = false;
		$.alertDialog.message = 'Oops, your Password is required to proceed.';
		$.alertDialog.show();
	}
	if (IsValid) {
		AdminLogin();
	}
}

function AdminLogin() {
	//showLoading('Logging in...');
	var Name = $.textfieldUsername.value, Password = $.textfieldPassword.value;
	var oArgs = {
		Name : Name,
		Password : Password,
		IsKeepLogged : true,
		Callback : 'login.login_success',
		ErrorCallback : 'login.login_error'
	};
	lib_accountadmin.AdminLogin(oArgs);
}

function doClear() {
	$.textfieldUsername.value = '';
	$.textfieldPassword.value = '';
}

function doBlur() {
	$.textfieldUsername.blur();
	$.textfieldPassword.blur();
}

function textfieldPassword_change() {
	$.buttonLogIn.enabled = true;
}

function textfieldUsername_return() {
	$.textfieldPassword.focus();
}

function textfieldPassword_return() {
	doValidate();
}

function login_success(e) {
	Ti.API.info(e);
	var oData = e.oData;
	var Username = $.textfieldUsername.value;
	Ti.App.Properties.setString('Username', Username);
	Ti.App.Properties.setString('Xid', oData.Xid);
	//lib_common.registerPushNotifications();
	Ti.App.fireEvent('registerPushNotifications');
	var Locations = oData.aLocation || [];
	var LocationId = oData.LocationId || 0;
	if (Locations.length > 0) {
		openLocations(Locations);
	} else {
		Ti.App.Properties.setString('LocationId', LocationId);
		Ti.App.fireEvent('company.initcontroller');
		Ti.App.fireEvent('menus.initcontroller');
		Ti.App.fireEvent('orders.initcontroller');
		//openStart();
	}
	//openStart();
	hideLoading();
	closeWin();
}

function login_error(e) {
	Ti.API.info(e);
	hideLoading();
}

function showLoading(Message) {
	if (Message != null && Message.length > 0)
		$.labelLoadingMessage.text = Message;
	$.activityindicatorLoading.show();
	$.viewLoading.visible = true;
	$.buttonLogIn.enabled = false;
}

function hideLoading() {
	$.viewLoading.visible = false;
	$.activityindicatorLoading.hide();
	$.buttonLogIn.enabled = true;
}

function initController() {

}

function setStageData() {
	$.textfieldUsername.value = 'collars';
	$.textfieldPassword.value = 'pqlamz';
	$.buttonLogIn.enabled = true;
}

$.win.addEventListener('focus', function() {
	doClear();
	if (Alloy.CFG.Environment != 'p') {
		setStageData();
	}
});

$.win.addEventListener('close', function() {
	Ti.App.removeEventListener('login.login_success', login_success);
	Ti.App.removeEventListener('login.login_error', login_error);
	Ti.App.removeEventListener('login.closewin', closeWin);
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('login.login_success', login_success);
	Ti.App.addEventListener('login.login_error', login_error);
	Ti.App.addEventListener('login.closewin', closeWin);
	initController();
});

