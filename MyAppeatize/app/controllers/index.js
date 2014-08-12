var lib_session = require('lib_session'), Cloud = require('ti.cloud'), lib_common = require('lib_common'), lib_push = require('lib_push');
var deviceToken = null;

$.index.open();

// function openStart() {
// // Ti.App.fireEvent('menus.initcontroller');
// var start = Alloy.createController('start1', {
// //NavBarTitle : 'Apps'
// }).getView();
// start.open();
// }

function openStart() {
	var startc;

	startc = Alloy.createController('startc', {
	}).getView();
	startc.open();
}

function openLocations(e) {
	var Locations = e.Locations;
	var locations = Alloy.createController('locations', {
		NavBarTitle : 'Locations',
		Locations : Locations
	}).getView();
	locations.open({
		modal : false,
		//animated : true
	});
}

function VerifySession() {
	var oArgs = {
		Callback : 'verifysession_success',
		ErrorCallback : 'verifysession_error'
	};
	lib_session.VerifySession(oArgs);
}

function verifysession_success(e) {
	Ti.API.info(e);
	//update views
}

function verifysession_error(e) {
	Ti.API.info(e);
	doLogOut();
}

function doLogOut() {
	Ti.App.Properties.removeProperty('Username');
	Ti.App.Properties.removeProperty('Xid');
	Ti.App.fireEvent('locations.closewin');
	Ti.App.fireEvent('settings.closewin');
	Ti.App.fireEvent('account.closewin');
	Ti.App.fireEvent('company.closewin');
	Ti.App.fireEvent('campaigns.closewin');
	Ti.App.fireEvent('menus.closewin');
	openLogin();
}

function openLogin() {
	var login = Alloy.createController('login').getView();
	login.open();
}

function validateSession() {
	var Xid = Ti.App.Properties.getString('Xid');
	if (Xid != null) {
		VerifySession();
	} else {
		//doLogOut();
	}
}

function resume() {
	validateSession();
	registerPushNotifications();
}

function initApp() {
	validateSession();
}

function receivePush(e) {
	//alert('receivePush');
	//alert(e);
	Ti.App.fireEvent('orders.getorderbylocation');
	Ti.App.fireEvent('start1.setactivetab', {
		ActiveTab : 1
	});
}

function deviceTokenSuccess(e) {
	//alert('deviceTokenSuccess');
	//alert(e);
	deviceToken = e.deviceToken;
	Ti.App.Properties.setString('PushToken', deviceToken);
	subscribeToChannel('alerts');
}

function deviceTokenError(e) {
	//alert('deviceTokenError');
	//alert(e);
}

function subscribeToChannel(Channel) {
	//alert('subscribeToChannel');
	//alert(deviceToken);
	InsertToken(deviceToken);
	Cloud.PushNotifications.subscribeToken({
		device_token : deviceToken,
		channel : Channel,
		type : 'ios'
	}, function(e) {
		//alert(e);
		if (e.success) {
			//alert('Subscribed');
		} else {
			alert('An error has occurred allowing push notifictions to be recieved on your device.');
		}
	});
}

function InsertToken(Token) {
	var oArgs = {
		Token : Token,
		Callback : '',
		ErrorCallback : ''
	};
	lib_push.InsertToken(oArgs);
}

function registerPushNotifications() {
	//alert('registerPushNotifications');
	Ti.Network.registerForPushNotifications({
		types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
		success : deviceTokenSuccess,
		error : deviceTokenError,
		callback : receivePush
	});
};

setTimeout(function() {
	$.index.backgroundImage = null;
}, 2000);

Ti.App.addEventListener('resume', resume);
Ti.App.addEventListener('logout', doLogOut);
Ti.App.addEventListener('openStart', openStart);
//Ti.App.addEventListener('openLocations', openLocations);
Ti.App.addEventListener('verifysession_success', verifysession_success);
Ti.App.addEventListener('verifysession_error', verifysession_error);
Ti.App.addEventListener('registerPushNotifications', registerPushNotifications);

Ti.UI.iPhone.appBadge = 0;
openStart();
initApp();
