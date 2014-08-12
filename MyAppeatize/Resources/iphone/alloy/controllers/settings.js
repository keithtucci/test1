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
    function doNotifications() {
        Ti.API.info("doNotifications");
        true == $.switchNotifications.value && Ti.App.fireEvent("registerPushNotifications");
    }
    function initController() {
        $.switchNotifications.value = false;
        $.labelVersion.text = "v" + Ti.App.version + Alloy.CFG.Environment;
    }
    function doUrl() {
        Titanium.Platform.openURL(Alloy.CFG.CompanyUrl);
    }
    function doEmail() {
        emailDialog.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "settings";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
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
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.dialogActions = Ti.UI.createOptionDialog({
        id: "dialogActions"
    });
    $.__views.alertDialog = Ti.UI.createAlertDialog({
        color: "#030303",
        tintColor: "#D82D16",
        id: "alertDialog",
        title: ""
    });
    $.__views.buttonBack = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        image: "/images/left-arrow-nav2.png",
        id: "buttonBack"
    });
    closeWin ? $.__views.buttonBack.addEventListener("click", closeWin) : __defers["$.__views.buttonBack!click!closeWin"] = true;
    $.__views.win.leftNavButton = $.__views.buttonBack;
    $.__views.viewData = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "absolute",
        visible: true,
        id: "viewData"
    });
    $.__views.win.add($.__views.viewData);
    var __alloyId98 = [];
    $.__views.tableviewrowNotifications = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 50,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        title: "Notifications",
        id: "tableviewrowNotifications"
    });
    __alloyId98.push($.__views.tableviewrowNotifications);
    $.__views.switchNotifications = Ti.UI.createSwitch({
        right: 10,
        value: false,
        id: "switchNotifications"
    });
    $.__views.tableviewrowNotifications.add($.__views.switchNotifications);
    doNotifications ? $.__views.switchNotifications.addEventListener("change", doNotifications) : __defers["$.__views.switchNotifications!change!doNotifications"] = true;
    $.__views.tableviewrowSupport = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 50,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        title: "Support",
        hasChild: true,
        id: "tableviewrowSupport"
    });
    __alloyId98.push($.__views.tableviewrowSupport);
    doEmail ? $.__views.tableviewrowSupport.addEventListener("click", doEmail) : __defers["$.__views.tableviewrowSupport!click!doEmail"] = true;
    $.__views.tableview = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        scrollable: false,
        bottom: 80,
        separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE,
        data: __alloyId98,
        id: "tableview"
    });
    $.__views.viewData.add($.__views.tableview);
    $.__views.viewLogo = Ti.UI.createView({
        layout: "vertical",
        bottom: 40,
        height: Ti.UI.SIZE,
        id: "viewLogo"
    });
    $.__views.viewData.add($.__views.viewLogo);
    doUrl ? $.__views.viewLogo.addEventListener("click", doUrl) : __defers["$.__views.viewLogo!click!doUrl"] = true;
    $.__views.labelPoweredBy = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        text: "Powered by",
        id: "labelPoweredBy"
    });
    $.__views.viewLogo.add($.__views.labelPoweredBy);
    $.__views.imageviewLogo = Ti.UI.createImageView({
        image: "images/navtitle-black.png",
        id: "imageviewLogo"
    });
    $.__views.viewLogo.add($.__views.imageviewLogo);
    $.__views.labelVersion = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        bottom: 10,
        id: "labelVersion"
    });
    $.__views.viewData.add($.__views.labelVersion);
    $.__views.activityindicatorLoading = Ti.UI.createActivityIndicator({
        style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
        id: "activityindicatorLoading"
    });
    $.__views.win.add($.__views.activityindicatorLoading);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parentWin;
    $.win.title = args.NavBarTitle;
    var emailDialog = Ti.UI.createEmailDialog();
    emailDialog.subject = Alloy.CFG.AppName + " Support";
    emailDialog.toRecipients = [ Alloy.CFG.SupportEmail ];
    emailDialog.messageBody = "***\n" + Ti.Platform.model + " " + "iPhone OS" + " " + Ti.Platform.version + " (" + Ti.Platform.osname + ")\n" + Alloy.CFG.AppName + " " + Ti.App.version + "\n\n***\n\n";
    $.win.addEventListener("close", function() {
        $.destroy();
    });
    $.win.addEventListener("open", function() {
        initController();
    });
    __defers["$.__views.buttonBack!click!closeWin"] && $.__views.buttonBack.addEventListener("click", closeWin);
    __defers["$.__views.switchNotifications!change!doNotifications"] && $.__views.switchNotifications.addEventListener("change", doNotifications);
    __defers["$.__views.tableviewrowSupport!click!doEmail"] && $.__views.tableviewrowSupport.addEventListener("click", doEmail);
    __defers["$.__views.viewLogo!click!doUrl"] && $.__views.viewLogo.addEventListener("click", doUrl);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;