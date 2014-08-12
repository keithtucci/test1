var lib_appeatize = require('lib_appeatize');
var deviceToken;
var args = arguments[0] || {}, oApp = {};

var winMain = $.win;
if (OS_ANDROID) {
	winMain = $.win2;
}

function AppDetail() {
	showLoading();
	var oArgs = {
		//DeviceKey : Ti.Platform.id,
		Callback : 'startc.appdetail_success',
		ErrorCallback : 'startc.appdetail_error'
	};
	lib_appeatize.AppDetail(oArgs);
}

function openNext(e) {
	Ti.API.info('openNext');
	Ti.App.fireEvent('registerPushNotifications');

	var Controller = e.Controller, NextController;
	var Locations = e.Locations, LocationId = e.LocationId;

	nextController = Alloy.createController(Controller, {
		parentWin : winMain,
		LocationId : LocationId,
		oApp : oApp
	});
	winMain.openWindow(nextController.getView());
}

function openAccountNext(oArgs, NextController, NavBarTitle, Type) {
	var Controller = Alloy.createController(NextController, {
		parentWin : winMain,
		oArgs : oArgs,
		NavBarTitle : NavBarTitle,
		Type : Type
	});
	$.win.openWindow(Controller.getView());
}

function openModal(oArgs, NextController, NavBarTitle, Type) {
	var Controller = Alloy.createController(NextController, {
		oArgs : oArgs,
		NavBarTitle : NavBarTitle,
		Type : Type
	}).getView();
	Controller.open({
		modal : true,
		animate : true
	});
}

function openSignUp() {
	openModal({}, 'signinup', 'Sign Up', 'signup');
}

function openLogIn() {
	openModal({}, 'signinup', 'Log In', 'login');
}

function openResetPw(e) {
	Ti.API.info(e);
	openModal(e, 'resetpw', 'Reset Password', 'resetpw');
}

function appdetail_success(e) {
	Ti.API.info(e);
	hideLoading();
	$.buttonRefresh.visible = false;
	oApp = e.oData.oSession;
	if (oApp.IsMulitLoc) {
		oApp.MultiLocation = true;
		if (OS_IOS) {
			//$.win2.fullscreen = false;
			//$.win2.statusBarStyle = Ti.UI.iPhone.StatusBar.GREY;
			//$.win2.backgroundImage = oApp.BgImage;
		}
	} else {
		oApp.MultiLocation = false;
		if (OS_IOS) {
			//$.win2.fullscreen = false;
			//$.win2.statusBarStyle = Ti.UI.iPhone.StatusBar.LIGHT_CONTENT;
		}
	}

	if (oApp.CommunityAppId > 0) {
		oApp.ThemeColor = '#282828';
		//$.imageviewMain.image = 'images/appeatize_bg1.jpg';
	} else {
		//$.imageviewMain.image = oApp.BgImage + '?x=1';
	}

	Ti.App.Properties.setObject('oApp', oApp);
	//Alloy.CFG.oApp = oApp;

	//openNext();
	//Ti.App.fireEvent('registerPushNotifications');
	Ti.API.info(oApp);
}

// function registerPushNotifications() {
// lib_common.registerPushNotifications();
// }

function appdetail_error(e) {
	Ti.API.info(e);
	hideLoading();
	$.buttonRefresh.visible = true;
}

function logoff(e) {
	Ti.API.info(e);
	Ti.App.Properties.removeProperty('Xid');
	Ti.App.fireEvent('locations.closewin');
	Ti.App.fireEvent('locationlist.closewin');
	Ti.App.fireEvent('location.closewin');
	Ti.App.fireEvent('myaccount.closewin');
	Ti.App.fireEvent('settings.closewin');
}

function initController() {
	AppDetail();
	//InitApp();
}

function showLoading(Message) {
	$.activityindicatorLoading.show();
}

function hideLoading() {
	$.activityindicatorLoading.hide();
}

function doRefresh() {
	AppDetail();
}

// winNav.addEventListener('focus', function() {
// // initController();
// });

winMain.addEventListener('close', function() {
	Ti.App.removeEventListener('startc.appdetail_success', appdetail_success);
	Ti.App.removeEventListener('startc.appdetail_error', appdetail_error);
	Ti.App.removeEventListener('startc.opennext', openNext);
	Ti.App.removeEventListener('startc.openresetpw', openResetPw);
	Ti.App.removeEventListener('startc.logoff', logoff);
	//Ti.App.removeEventListener('registerPushNotifications', registerPushNotifications);
	$.destroy();
	//if (OS_ANDROID){
	//winNav.fullscreen = false;
	//activity.finish();
	//}
});

winMain.addEventListener('open', function() {
	Ti.App.addEventListener('startc.appdetail_success', appdetail_success);
	Ti.App.addEventListener('startc.appdetail_error', appdetail_error);
	Ti.App.addEventListener('startc.opennext', openNext);
	Ti.App.addEventListener('startc.openresetpw', openResetPw);
	Ti.App.addEventListener('startc.logoff', logoff);
	//Ti.App.addEventListener('registerPushNotifications', registerPushNotifications);
	initController();
});
