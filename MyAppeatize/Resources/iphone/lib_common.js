function receivePush() {
    Ti.App.fireEvent("orders.getorderbylocation");
    Ti.App.fireEvent("start1.setactivetab", {
        ActiveTab: 1
    });
}

function deviceTokenSuccess(e) {
    deviceToken = e.deviceToken;
    Ti.App.Properties.setString("PushToken", deviceToken);
    subscribeToChannel("alerts");
}

function deviceTokenError() {}

function subscribeToChannel(Channel) {
    InsertToken(deviceToken);
    Cloud.PushNotifications.subscribeToken({
        device_token: deviceToken,
        channel: Channel,
        type: "ios"
    }, function(e) {
        e.success;
    });
}

function InsertToken(Token) {
    var oArgs = {
        Token: Token,
        Callback: "",
        ErrorCallback: ""
    };
    lib_push.InsertToken(oArgs);
}

var Cloud = require("ti.cloud"), lib_push = require("lib_push");

var deviceToken = null;

exports.registerPushNotifications = function() {
    Ti.Network.registerForPushNotifications({
        types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
        success: deviceTokenSuccess,
        error: deviceTokenError,
        callback: receivePush
    });
};