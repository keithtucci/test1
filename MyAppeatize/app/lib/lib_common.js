var Cloud = require('ti.cloud'), lib_push = require("lib_push");
var deviceToken = null;

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
			//alert('An error has occurred allowing push notifictions to be recieved on your device.');
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

exports.registerPushNotifications = function() {
	//alert('registerPushNotifications');
	Ti.Network.registerForPushNotifications({
		types : [Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND],
		success : deviceTokenSuccess,
		error : deviceTokenError,
		callback : receivePush
	});
};

// exports.parseCFJSON = function(serialObj) {
// var s = serialObj || {};
// if (!s.COLUMNS && !s.DATA) {
// Ti.API.info('error');
// return [];
// }
// var obj = [];
// for (var i = 0; i < s.DATA.length; i++) {
// var temp = {};
// for (var j = 0; j < s.COLUMNS.length; j++) {
// temp[s.COLUMNS[j]] = s.DATA[i][j];
// }
// obj.push(temp);
// }
// return obj;
// };
