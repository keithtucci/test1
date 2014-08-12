function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function closeWin() {
        $.win.close();
    }
    function openLocations(Locations) {
        Ti.App.fireEvent("openLocations", {
            Locations: Locations
        });
    }
    function doValidate() {
        doBlur();
        var IsValid = true;
        if (IsValid && 0 == $.textfieldUsername.value.length) {
            IsValid = false;
            $.alertDialog.message = "Oops, your Username is required to proceed.";
            $.alertDialog.show();
        }
        if (IsValid && 0 == $.textfieldPassword.value.length) {
            IsValid = false;
            $.alertDialog.message = "Oops, your Password is required to proceed.";
            $.alertDialog.show();
        }
        IsValid && AdminLogin();
    }
    function AdminLogin() {
        var Name = $.textfieldUsername.value, Password = $.textfieldPassword.value;
        var oArgs = {
            Name: Name,
            Password: Password,
            IsKeepLogged: true,
            Callback: "login.login_success",
            ErrorCallback: "login.login_error"
        };
        lib_accountadmin.AdminLogin(oArgs);
    }
    function doClear() {
        $.textfieldUsername.value = "";
        $.textfieldPassword.value = "";
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
        Ti.App.Properties.setString("Username", Username);
        Ti.App.Properties.setString("Xid", oData.Xid);
        Ti.App.fireEvent("registerPushNotifications");
        var Locations = oData.aLocation || [];
        var LocationId = oData.LocationId || 0;
        if (Locations.length > 0) openLocations(Locations); else {
            Ti.App.Properties.setString("LocationId", LocationId);
            Ti.App.fireEvent("company.initcontroller");
            Ti.App.fireEvent("menus.initcontroller");
            Ti.App.fireEvent("orders.initcontroller");
        }
        hideLoading();
        closeWin();
    }
    function login_error(e) {
        Ti.API.info(e);
        hideLoading();
    }
    function hideLoading() {
        $.viewLoading.visible = false;
        $.activityindicatorLoading.hide();
        $.buttonLogIn.enabled = true;
    }
    function initController() {}
    function setStageData() {
        $.textfieldUsername.value = "collars";
        $.textfieldPassword.value = "pqlamz";
        $.buttonLogIn.enabled = true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win2 = Ti.UI.createWindow({
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
        titleImage: "/images/navtitle-white.png",
        id: "win2"
    });
    $.__views.buttonLogIn = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
        title: "Log In",
        enabled: false,
        id: "buttonLogIn"
    });
    doValidate ? $.__views.buttonLogIn.addEventListener("click", doValidate) : __defers["$.__views.buttonLogIn!click!doValidate"] = true;
    $.__views.win2.rightNavButton = $.__views.buttonLogIn;
    $.__views.alertDialog = Ti.UI.createAlertDialog({
        color: "#030303",
        tintColor: "#D82D16",
        id: "alertDialog",
        title: ""
    });
    $.__views.viewData = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "absolute",
        visible: true,
        id: "viewData"
    });
    $.__views.win2.add($.__views.viewData);
    var __alloyId63 = [];
    $.__views.__alloyId64 = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 50,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "__alloyId64"
    });
    __alloyId63.push($.__views.__alloyId64);
    $.__views.textfieldUsername = Ti.UI.createTextField({
        height: 40,
        color: "#000000",
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#fff",
        borderWidth: 1,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        font: {
            fontSize: 18
        },
        paddingLeft: 5,
        left: 15,
        textAlign: "left",
        right: 10,
        autocapitalization: false,
        autocorrect: false,
        hintText: "Username",
        maxLength: 50,
        id: "textfieldUsername"
    });
    $.__views.__alloyId64.add($.__views.textfieldUsername);
    textfieldUsername_return ? $.__views.textfieldUsername.addEventListener("return", textfieldUsername_return) : __defers["$.__views.textfieldUsername!return!textfieldUsername_return"] = true;
    $.__views.__alloyId65 = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 50,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "__alloyId65"
    });
    __alloyId63.push($.__views.__alloyId65);
    $.__views.textfieldPassword = Ti.UI.createTextField({
        height: 40,
        color: "#000000",
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#fff",
        borderWidth: 1,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        font: {
            fontSize: 18
        },
        paddingLeft: 5,
        left: 15,
        textAlign: "left",
        right: 10,
        passwordMask: true,
        hintText: "Password",
        maxLength: 50,
        id: "textfieldPassword"
    });
    $.__views.__alloyId65.add($.__views.textfieldPassword);
    textfieldPassword_return ? $.__views.textfieldPassword.addEventListener("return", textfieldPassword_return) : __defers["$.__views.textfieldPassword!return!textfieldPassword_return"] = true;
    textfieldPassword_change ? $.__views.textfieldPassword.addEventListener("change", textfieldPassword_change) : __defers["$.__views.textfieldPassword!change!textfieldPassword_change"] = true;
    $.__views.tableview = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        width: 320,
        scrollable: false,
        top: 0,
        data: __alloyId63,
        id: "tableview"
    });
    $.__views.viewData.add($.__views.tableview);
    $.__views.viewLoading = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "absolute",
        visible: "false",
        backgroundColor: "#AAAAAA",
        opacity: ".70",
        borderRadius: 0,
        id: "viewLoading"
    });
    $.__views.win2.add($.__views.viewLoading);
    $.__views.viewLoadingContainer = Ti.UI.createView({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "viewLoadingContainer"
    });
    $.__views.viewLoading.add($.__views.viewLoadingContainer);
    $.__views.activityindicatorLoading = Ti.UI.createActivityIndicator({
        style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
        id: "activityindicatorLoading"
    });
    $.__views.viewLoadingContainer.add($.__views.activityindicatorLoading);
    $.__views.labelLoadingMessage = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#F7F7F7",
        textAlign: "center",
        font: {
            fontSize: 16
        },
        top: 10,
        id: "labelLoadingMessage"
    });
    $.__views.viewLoadingContainer.add($.__views.labelLoadingMessage);
    $.__views.win = Ti.UI.iOS.createNavigationWindow({
        tabBarHidden: true,
        navBarHidden: true,
        titleImage: "/images/navtitle-white.png",
        window: $.__views.win2,
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var lib_accountadmin = require("lib_accountadmin");
    require("lib_common");
    $.win.addEventListener("focus", function() {
        doClear();
        "p" != Alloy.CFG.Environment && setStageData();
    });
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("login.login_success", login_success);
        Ti.App.removeEventListener("login.login_error", login_error);
        Ti.App.removeEventListener("login.closewin", closeWin);
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("login.login_success", login_success);
        Ti.App.addEventListener("login.login_error", login_error);
        Ti.App.addEventListener("login.closewin", closeWin);
        initController();
    });
    __defers["$.__views.buttonLogIn!click!doValidate"] && $.__views.buttonLogIn.addEventListener("click", doValidate);
    __defers["$.__views.textfieldUsername!return!textfieldUsername_return"] && $.__views.textfieldUsername.addEventListener("return", textfieldUsername_return);
    __defers["$.__views.textfieldPassword!return!textfieldPassword_return"] && $.__views.textfieldPassword.addEventListener("return", textfieldPassword_return);
    __defers["$.__views.textfieldPassword!change!textfieldPassword_change"] && $.__views.textfieldPassword.addEventListener("change", textfieldPassword_change);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;