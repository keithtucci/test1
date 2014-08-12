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
        $.win.close({
            animated: true
        });
    }
    function showSignUp() {
        Ti.API.info("showSignUp");
        Type = "signup";
        var Title = "Sign Up";
        $.buttonLogIn.visible = false;
        $.viewForgotPassword.visible = false;
        $.buttonSignUp.visible = true;
        $.buttonSignInUpAction.title = Title;
        $.win2.title = Title;
    }
    function showLogIn() {
        Ti.API.info("showLogIn");
        Type = "login";
        var Title = "Log In";
        $.buttonSignUp.visible = false;
        $.viewForgotPassword.visible = true;
        $.buttonLogIn.visible = true;
        $.buttonSignInUpAction.title = Title;
        $.win2.title = Title;
    }
    function doForgotPassword() {
        var IsValid = true, Email = $.textfieldEmail.value;
        if (IsValid && 0 == Email.length) {
            IsValid = false;
            var MessageTitle = "Email Required", Message = "Please enter an email address.";
            lib_alert.showAlert(Message, MessageTitle);
        }
        IsValid && RequestReset(Email);
    }
    function textfieldEmail_return() {
        $.textfieldPassword.focus();
    }
    function textfieldPassword_return() {
        doValidate();
    }
    function Login(Email, Password) {
        showLoading();
        var oArgs = {
            Email: Email,
            Password: Password,
            IsKeepLogged: true,
            Callback: "signinup.login_success",
            ErrorCallback: "signinup.login_error"
        };
        lib_login.Login(oArgs);
    }
    function PostLogin() {
        showLoading();
        var oArgs = {
            Callback: "signinup.postlogin_success",
            ErrorCallback: "signinup.postlogin_error"
        };
        lib_accountadmin.PostLogin(oArgs);
    }
    function CommitAccount(Email, Password) {
        showLoading();
        var oArgs = {
            Email: Email,
            Password: Password,
            Callback: "signinup.commitaccount_success",
            ErrorCallback: "signinup.commitaccount_error"
        };
        lib_account.CommitAccount(oArgs);
    }
    function RequestReset(Email) {
        showLoading();
        var oArgs = {
            Email: Email,
            Callback: "signinup.requestreset_success",
            ErrorCallback: "signinup.requestreset_error"
        };
        lib_account.RequestReset(oArgs);
    }
    function doValidate() {
        var IsValid = true, Email = $.textfieldEmail.value, Password = $.textfieldPassword.value;
        if (IsValid && 0 == Email.length) {
            IsValid = false;
            var MessageTitle = "Email Required", Message = "Please enter an email address.";
            lib_alert.showAlert(Message, MessageTitle);
        }
        if (IsValid && 0 == Password.length) {
            IsValid = false;
            var MessageTitle = "Password Required", Message = "Please enter a password.";
            lib_alert.showAlert(Message, MessageTitle);
        }
        IsValid && ("signup" == Type ? CommitAccount(Email, Password) : "login" == Type && Login(Email, Password));
    }
    function requestreset_success(e) {
        Ti.API.info(e);
        hideLoading();
        closeWin();
        var MessageTitle = "You've Got Mail", Message = "Check your email momentarily for the password reset link.";
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
        Ti.App.Properties.setString("Xid", Xid);
        Ti.App.fireEvent("startc.opennext");
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
        Ti.App.Properties.setString("Xid", Xid);
        var Username = $.textfieldEmail.value;
        Ti.App.Properties.setString("Username", Username);
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
        var Locations = [], Controller = "start1";
        var LocationId = oData.LocationId || 0;
        if (Locations.length > 0) Controller = "locations"; else {
            Ti.App.Properties.setString("LocationId", LocationId);
            Ti.App.fireEvent("company.initcontroller");
            Ti.App.fireEvent("menus.initcontroller");
            Ti.App.fireEvent("orders.initcontroller");
        }
        Ti.App.fireEvent("startc.opennext", {
            Controller: Controller,
            LocationId: LocationId,
            Locations: Locations
        });
        closeWin();
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "signinup";
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
        id: "win2"
    });
    $.__views.buttonDown = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        image: "/images/down-arrow-nav2.png",
        id: "buttonDown"
    });
    closeWin ? $.__views.buttonDown.addEventListener("click", closeWin) : __defers["$.__views.buttonDown!click!closeWin"] = true;
    $.__views.win2.leftNavButton = $.__views.buttonDown;
    $.__views.viewData = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "absolute",
        visible: true,
        id: "viewData"
    });
    $.__views.win2.add($.__views.viewData);
    $.__views.__alloyId100 = Ti.UI.createView({
        layout: "vertical",
        top: 0,
        id: "__alloyId100"
    });
    $.__views.viewData.add($.__views.__alloyId100);
    $.__views.__alloyId101 = Ti.UI.createView({
        top: 0,
        height: 50,
        left: 15,
        right: 15,
        id: "__alloyId101"
    });
    $.__views.__alloyId100.add($.__views.__alloyId101);
    $.__views.buttonSignUp = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 14
        },
        right: 0,
        title: "Already have an account?",
        visible: false,
        tintColor: "#666666",
        id: "buttonSignUp"
    });
    $.__views.__alloyId101.add($.__views.buttonSignUp);
    showLogIn ? $.__views.buttonSignUp.addEventListener("click", showLogIn) : __defers["$.__views.buttonSignUp!click!showLogIn"] = true;
    $.__views.buttonLogIn = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 14
        },
        right: 0,
        title: "Don't have an account?",
        visible: false,
        tintColor: "#666666",
        id: "buttonLogIn"
    });
    $.__views.__alloyId101.add($.__views.buttonLogIn);
    showSignUp ? $.__views.buttonLogIn.addEventListener("click", showSignUp) : __defers["$.__views.buttonLogIn!click!showSignUp"] = true;
    $.__views.__alloyId102 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        id: "__alloyId102"
    });
    $.__views.__alloyId100.add($.__views.__alloyId102);
    var __alloyId104 = [];
    $.__views.__alloyId105 = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 44,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "__alloyId105"
    });
    __alloyId104.push($.__views.__alloyId105);
    $.__views.textfieldEmail = Ti.UI.createTextField({
        height: 40,
        color: "#282828",
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#fff",
        borderWidth: 1,
        keyboardType: Titanium.UI.KEYBOARD_EMAIL,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        font: {
            fontSize: 18
        },
        paddingLeft: 1,
        left: 14,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        right: 0,
        hintText: "Email",
        maxLength: 50,
        autocorrect: false,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "textfieldEmail"
    });
    $.__views.__alloyId105.add($.__views.textfieldEmail);
    textfieldEmail_return ? $.__views.textfieldEmail.addEventListener("return", textfieldEmail_return) : __defers["$.__views.textfieldEmail!return!textfieldEmail_return"] = true;
    $.__views.__alloyId106 = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 44,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "__alloyId106"
    });
    __alloyId104.push($.__views.__alloyId106);
    $.__views.textfieldPassword = Ti.UI.createTextField({
        height: 40,
        color: "#282828",
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#fff",
        borderWidth: 1,
        keyboardType: Titanium.UI.DEFAULT,
        returnKeyType: Ti.UI.RETURNKEY_DONE,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        font: {
            fontSize: 18
        },
        paddingLeft: 1,
        left: 14,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        right: 0,
        hintText: "Password",
        passwordMask: true,
        maxLength: 20,
        autocorrect: false,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "textfieldPassword"
    });
    $.__views.__alloyId106.add($.__views.textfieldPassword);
    textfieldPassword_return ? $.__views.textfieldPassword.addEventListener("return", textfieldPassword_return) : __defers["$.__views.textfieldPassword!return!textfieldPassword_return"] = true;
    $.__views.__alloyId103 = Ti.UI.createTableView({
        height: 87,
        backgroundColor: "transparent",
        allowsSelection: true,
        scrollable: false,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE,
        style: Titanium.UI.iPhone.TableViewStyle.PLAIN,
        data: __alloyId104,
        id: "__alloyId103"
    });
    $.__views.__alloyId100.add($.__views.__alloyId103);
    $.__views.__alloyId107 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        id: "__alloyId107"
    });
    $.__views.__alloyId100.add($.__views.__alloyId107);
    $.__views.__alloyId108 = Ti.UI.createView({
        backgroundColor: "#40AB2B",
        top: 20,
        height: 44,
        left: 20,
        right: 20,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "__alloyId108"
    });
    $.__views.__alloyId100.add($.__views.__alloyId108);
    $.__views.buttonSignInUpAction = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 18
        },
        height: Titanium.UI.FILL,
        width: Titanium.UI.FILL,
        tintColor: "#FFFFFF",
        id: "buttonSignInUpAction"
    });
    $.__views.__alloyId108.add($.__views.buttonSignInUpAction);
    doValidate ? $.__views.buttonSignInUpAction.addEventListener("click", doValidate) : __defers["$.__views.buttonSignInUpAction!click!doValidate"] = true;
    $.__views.viewForgotPassword = Ti.UI.createView({
        top: 0,
        height: 50,
        left: 15,
        right: 15,
        visible: false,
        id: "viewForgotPassword"
    });
    $.__views.__alloyId100.add($.__views.viewForgotPassword);
    $.__views.buttonForgotPassword = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 14
        },
        title: "Forgot Password",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        tintColor: "#666666",
        id: "buttonForgotPassword"
    });
    $.__views.viewForgotPassword.add($.__views.buttonForgotPassword);
    doForgotPassword ? $.__views.buttonForgotPassword.addEventListener("click", doForgotPassword) : __defers["$.__views.buttonForgotPassword!click!doForgotPassword"] = true;
    $.__views.viewLoading = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "absolute",
        visible: false,
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
    $.__views.win = require("xp.ui").createNavigationWindow({
        window: $.__views.win2,
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var lib_account = require("lib_account"), lib_accountadmin = require("lib_accountadmin"), lib_login = require("lib_login"), lib_alert = (require("lib_common"), 
    require("lib_alert"));
    require("alloy/animation");
    var args = arguments[0] || {}, Type = args.Type;
    "login" == Type ? showLogIn() : showSignUp();
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("signinup.closewin", closeWin);
        Ti.App.removeEventListener("signinup.login_success", login_success);
        Ti.App.removeEventListener("signinup.login_error", login_error);
        Ti.App.removeEventListener("signinup.postlogin_success", postlogin_success);
        Ti.App.removeEventListener("signinup.postlogin_error", postlogin_error);
        Ti.App.removeEventListener("signinup.commitaccount_success", commitaccount_success);
        Ti.App.removeEventListener("signinup.commitaccount_error", commitaccount_error);
        Ti.App.removeEventListener("signinup.requestreset_success", requestreset_success);
        Ti.App.removeEventListener("signinup.requestreset_error", requestreset_error);
        $.destroy();
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("signinup.closewin", closeWin);
        Ti.App.addEventListener("signinup.login_success", login_success);
        Ti.App.addEventListener("signinup.login_error", login_error);
        Ti.App.addEventListener("signinup.postlogin_success", postlogin_success);
        Ti.App.addEventListener("signinup.postlogin_error", postlogin_error);
        Ti.App.addEventListener("signinup.commitaccount_success", commitaccount_success);
        Ti.App.addEventListener("signinup.commitaccount_error", commitaccount_error);
        Ti.App.addEventListener("signinup.requestreset_success", requestreset_success);
        Ti.App.addEventListener("signinup.requestreset_error", requestreset_error);
        initController();
    });
    __defers["$.__views.buttonDown!click!closeWin"] && $.__views.buttonDown.addEventListener("click", closeWin);
    __defers["$.__views.buttonSignUp!click!showLogIn"] && $.__views.buttonSignUp.addEventListener("click", showLogIn);
    __defers["$.__views.buttonLogIn!click!showSignUp"] && $.__views.buttonLogIn.addEventListener("click", showSignUp);
    __defers["$.__views.textfieldEmail!return!textfieldEmail_return"] && $.__views.textfieldEmail.addEventListener("return", textfieldEmail_return);
    __defers["$.__views.textfieldPassword!return!textfieldPassword_return"] && $.__views.textfieldPassword.addEventListener("return", textfieldPassword_return);
    __defers["$.__views.buttonSignInUpAction!click!doValidate"] && $.__views.buttonSignInUpAction.addEventListener("click", doValidate);
    __defers["$.__views.buttonForgotPassword!click!doForgotPassword"] && $.__views.buttonForgotPassword.addEventListener("click", doForgotPassword);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;