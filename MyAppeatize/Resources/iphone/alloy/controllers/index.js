function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openStart() {
        var startc;
        startc = Alloy.createController("startc", {}).getView();
        startc.open();
    }
    function VerifySession() {
        var oArgs = {
            Callback: "verifysession_success",
            ErrorCallback: "verifysession_error"
        };
        lib_session.VerifySession(oArgs);
    }
    function verifysession_success(e) {
        Ti.API.info(e);
    }
    function verifysession_error(e) {
        Ti.API.info(e);
        doLogOut();
    }
    function doLogOut() {
        Ti.App.Properties.removeProperty("Username");
        Ti.App.Properties.removeProperty("Xid");
        Ti.App.fireEvent("locations.closewin");
        Ti.App.fireEvent("settings.closewin");
        Ti.App.fireEvent("account.closewin");
        Ti.App.fireEvent("company.closewin");
        Ti.App.fireEvent("campaigns.closewin");
        Ti.App.fireEvent("menus.closewin");
        openLogin();
    }
    function openLogin() {
        var login = Alloy.createController("login").getView();
        login.open();
    }
    function validateSession() {
        var Xid = Ti.App.Properties.getString("Xid");
        null != Xid && VerifySession();
    }
    function resume() {
        validateSession();
        registerPushNotifications();
    }
    function initApp() {
        validateSession();
    }
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
            e.success || alert("An error has occurred allowing push notifictions to be recieved on your device.");
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
    function registerPushNotifications() {
        Ti.Network.registerForPushNotifications({
            types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
            success: deviceTokenSuccess,
            error: deviceTokenError,
            callback: receivePush
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#F7F7F7",
        layout: "absolute",
        tabBarHidden: false,
        navBarHidden: false,
        tintColor: "#666666",
        navTintColor: "#F7F7F7",
        barColor: "#282828",
        fullscreen: false,
        translucent: false,
        statusBarStyle: Ti.UI.iPhone.StatusBar.LIGHT_CONTENT,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.alertDialog = Ti.UI.createAlertDialog({
        color: "#030303",
        tintColor: "#D82D16",
        id: "alertDialog",
        title: ""
    });
    exports.destroy = function() {};
    _.extend($, $.__views);
    var lib_session = require("lib_session"), Cloud = require("ti.cloud"), lib_push = (require("lib_common"), 
    require("lib_push"));
    var deviceToken = null;
    $.index.open();
    setTimeout(function() {
        $.index.backgroundImage = null;
    }, 2e3);
    Ti.App.addEventListener("resume", resume);
    Ti.App.addEventListener("logout", doLogOut);
    Ti.App.addEventListener("openStart", openStart);
    Ti.App.addEventListener("verifysession_success", verifysession_success);
    Ti.App.addEventListener("verifysession_error", verifysession_error);
    Ti.App.addEventListener("registerPushNotifications", registerPushNotifications);
    Ti.UI.iPhone.appBadge = 0;
    openStart();
    initApp();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;