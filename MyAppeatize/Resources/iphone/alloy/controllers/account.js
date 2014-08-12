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
    function openSettings() {
        openNext("settings", {}, "Settings");
    }
    function doLogOut() {
        closeWin();
        Ti.App.fireEvent("logout");
    }
    function openNext(Controller, oOrder, NavBarTitle) {
        Ti.API.info("openNext");
        var nextController = Alloy.createController(Controller, {
            parentWin: parentWin,
            NavBarTitle: NavBarTitle
        });
        parentWin.openWindow(nextController.getView());
    }
    function initController() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "account";
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
        tabBarHidden: true,
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
    $.__views.buttonSettings = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        image: "/img/setting-gear.png",
        id: "buttonSettings"
    });
    openSettings ? $.__views.buttonSettings.addEventListener("click", openSettings) : __defers["$.__views.buttonSettings!click!openSettings"] = true;
    $.__views.win.rightNavButton = $.__views.buttonSettings;
    $.__views.viewData = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        visible: true,
        id: "viewData"
    });
    $.__views.win.add($.__views.viewData);
    var __alloyId13 = [];
    $.__views.__alloyId14 = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "__alloyId14"
    });
    __alloyId13.push($.__views.__alloyId14);
    doLogOut ? $.__views.__alloyId14.addEventListener("click", doLogOut) : __defers["$.__views.__alloyId14!click!doLogOut"] = true;
    $.__views.buttonLogout = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        title: "Logout",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        color: "#ee3b33",
        id: "buttonLogout"
    });
    $.__views.__alloyId14.add($.__views.buttonLogout);
    $.__views.tableview = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        rowHeight: 60,
        data: __alloyId13,
        id: "tableview"
    });
    $.__views.viewData.add($.__views.tableview);
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
    $.__views.win.add($.__views.viewLoading);
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
    $.__views.viewNoData = Ti.UI.createView({
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "absolute",
        visible: false,
        id: "viewNoData"
    });
    $.__views.win.add($.__views.viewNoData);
    $.__views.__alloyId15 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId15"
    });
    $.__views.viewNoData.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createImageView({
        bottom: 20,
        image: "img/clock-3-nodata.png",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.labelNoDataMessage = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#999999",
        textAlign: "center",
        font: {
            fontSize: 16
        },
        left: 20,
        right: 20,
        id: "labelNoDataMessage"
    });
    $.__views.__alloyId15.add($.__views.labelNoDataMessage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("lib_ordertext");
    var args = arguments[0] || {}, parentWin = args.parentWin;
    $.win.title = args.NavBarTitle;
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("account.closewin", closeWin);
        $.destroy();
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("account.closewin", closeWin);
        initController();
    });
    __defers["$.__views.buttonBack!click!closeWin"] && $.__views.buttonBack.addEventListener("click", closeWin);
    __defers["$.__views.buttonSettings!click!openSettings"] && $.__views.buttonSettings.addEventListener("click", openSettings);
    __defers["$.__views.__alloyId14!click!doLogOut"] && $.__views.__alloyId14.addEventListener("click", doLogOut);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;