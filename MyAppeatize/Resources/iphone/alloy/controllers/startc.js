function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function AppDetail() {
        showLoading();
        var oArgs = {
            Callback: "startc.appdetail_success",
            ErrorCallback: "startc.appdetail_error"
        };
        lib_appeatize.AppDetail(oArgs);
    }
    function openNext(e) {
        Ti.API.info("openNext");
        Ti.App.fireEvent("registerPushNotifications");
        var Controller = e.Controller;
        var LocationId = (e.Locations, e.LocationId);
        nextController = Alloy.createController(Controller, {
            parentWin: winMain,
            LocationId: LocationId,
            oApp: oApp
        });
        winMain.openWindow(nextController.getView());
    }
    function openModal(oArgs, NextController, NavBarTitle, Type) {
        var Controller = Alloy.createController(NextController, {
            oArgs: oArgs,
            NavBarTitle: NavBarTitle,
            Type: Type
        }).getView();
        Controller.open({
            modal: true,
            animate: true
        });
    }
    function openSignUp() {
        openModal({}, "signinup", "Sign Up", "signup");
    }
    function openLogIn() {
        openModal({}, "signinup", "Log In", "login");
    }
    function openResetPw(e) {
        Ti.API.info(e);
        openModal(e, "resetpw", "Reset Password", "resetpw");
    }
    function appdetail_success(e) {
        Ti.API.info(e);
        hideLoading();
        $.buttonRefresh.visible = false;
        oApp = e.oData.oSession;
        oApp.MultiLocation = oApp.IsMulitLoc ? true : false;
        oApp.CommunityAppId > 0 && (oApp.ThemeColor = "#282828");
        Ti.App.Properties.setObject("oApp", oApp);
        Ti.API.info(oApp);
    }
    function appdetail_error(e) {
        Ti.API.info(e);
        hideLoading();
        $.buttonRefresh.visible = true;
    }
    function logoff(e) {
        Ti.API.info(e);
        Ti.App.Properties.removeProperty("Xid");
        Ti.App.fireEvent("locations.closewin");
        Ti.App.fireEvent("locationlist.closewin");
        Ti.App.fireEvent("location.closewin");
        Ti.App.fireEvent("myaccount.closewin");
        Ti.App.fireEvent("settings.closewin");
    }
    function initController() {
        AppDetail();
    }
    function showLoading() {
        $.activityindicatorLoading.show();
    }
    function hideLoading() {
        $.activityindicatorLoading.hide();
    }
    function doRefresh() {
        AppDetail();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "startc";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win2 = Ti.UI.createWindow({
        backgroundColor: "#050505",
        layout: "absolute",
        tabBarHidden: false,
        navBarHidden: true,
        tintColor: "#666666",
        navTintColor: "#F7F7F7",
        barColor: "#282828",
        fullscreen: false,
        translucent: false,
        statusBarStyle: Ti.UI.iPhone.StatusBar.LIGHT_CONTENT,
        id: "win2"
    });
    $.__views.imageviewMain = Ti.UI.createImageView({
        image: "img/bg1.jpg",
        id: "imageviewMain"
    });
    $.__views.win2.add($.__views.imageviewMain);
    $.__views.viewButtonsBg = Ti.UI.createView({
        height: 60,
        width: Ti.UI.FILL,
        layout: "horizontal",
        bottom: 0,
        backgroundColor: "#282828",
        opacity: ".7",
        id: "viewButtonsBg"
    });
    $.__views.win2.add($.__views.viewButtonsBg);
    $.__views.viewButtons = Ti.UI.createView({
        height: 60,
        width: Ti.UI.FILL,
        layout: "horizontal",
        bottom: 0,
        id: "viewButtons"
    });
    $.__views.win2.add($.__views.viewButtons);
    $.__views.__alloyId110 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: "50%",
        id: "__alloyId110"
    });
    $.__views.viewButtons.add($.__views.__alloyId110);
    $.__views.buttonSignUp = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 18
        },
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        tintColor: "#FFFFFF",
        title: "Sign Up",
        id: "buttonSignUp"
    });
    $.__views.__alloyId110.add($.__views.buttonSignUp);
    openSignUp ? $.__views.buttonSignUp.addEventListener("click", openSignUp) : __defers["$.__views.buttonSignUp!click!openSignUp"] = true;
    $.__views.viewVLine = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: "1px",
        borderColor: "#AAAAAA",
        borderWidth: "1px",
        top: 10,
        bottom: 10,
        right: 0,
        id: "viewVLine"
    });
    $.__views.__alloyId110.add($.__views.viewVLine);
    $.__views.__alloyId111 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: "50%",
        id: "__alloyId111"
    });
    $.__views.viewButtons.add($.__views.__alloyId111);
    $.__views.buttonLogIn = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 18
        },
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        tintColor: "#FFFFFF",
        title: "Log In",
        id: "buttonLogIn"
    });
    $.__views.__alloyId111.add($.__views.buttonLogIn);
    openLogIn ? $.__views.buttonLogIn.addEventListener("click", openLogIn) : __defers["$.__views.buttonLogIn!click!openLogIn"] = true;
    $.__views.buttonRefresh = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        image: "/img/refresh.png",
        tintColor: "#FFFFFF",
        title: "Reload",
        visible: false,
        id: "buttonRefresh"
    });
    $.__views.win2.add($.__views.buttonRefresh);
    doRefresh ? $.__views.buttonRefresh.addEventListener("click", doRefresh) : __defers["$.__views.buttonRefresh!click!doRefresh"] = true;
    $.__views.activityindicatorLoading = Ti.UI.createActivityIndicator({
        style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
        id: "activityindicatorLoading"
    });
    $.__views.win2.add($.__views.activityindicatorLoading);
    $.__views.win = require("xp.ui").createNavigationWindow({
        navBarHidden: true,
        window: $.__views.win2,
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var lib_appeatize = require("lib_appeatize");
    var oApp = (arguments[0] || {}, {});
    var winMain = $.win;
    winMain.addEventListener("close", function() {
        Ti.App.removeEventListener("startc.appdetail_success", appdetail_success);
        Ti.App.removeEventListener("startc.appdetail_error", appdetail_error);
        Ti.App.removeEventListener("startc.opennext", openNext);
        Ti.App.removeEventListener("startc.openresetpw", openResetPw);
        Ti.App.removeEventListener("startc.logoff", logoff);
        $.destroy();
    });
    winMain.addEventListener("open", function() {
        Ti.App.addEventListener("startc.appdetail_success", appdetail_success);
        Ti.App.addEventListener("startc.appdetail_error", appdetail_error);
        Ti.App.addEventListener("startc.opennext", openNext);
        Ti.App.addEventListener("startc.openresetpw", openResetPw);
        Ti.App.addEventListener("startc.logoff", logoff);
        initController();
    });
    __defers["$.__views.buttonSignUp!click!openSignUp"] && $.__views.buttonSignUp.addEventListener("click", openSignUp);
    __defers["$.__views.buttonLogIn!click!openLogIn"] && $.__views.buttonLogIn.addEventListener("click", openLogIn);
    __defers["$.__views.buttonRefresh!click!doRefresh"] && $.__views.buttonRefresh.addEventListener("click", doRefresh);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;