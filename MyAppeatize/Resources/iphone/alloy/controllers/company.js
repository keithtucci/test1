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
    function initController() {
        $.viewNoData.visible = true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "company";
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
    $.__views.viewData = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        visible: true,
        id: "viewData"
    });
    $.__views.win.add($.__views.viewData);
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
    $.__views.__alloyId48 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId48"
    });
    $.__views.viewNoData.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createImageView({
        bottom: 20,
        image: "img/flag-1-nodata.png",
        id: "__alloyId49"
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
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
        text: "Contact Appeatize to learn more about our Company service.",
        id: "labelNoDataMessage"
    });
    $.__views.__alloyId48.add($.__views.labelNoDataMessage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    args.parentWin;
    $.win.title = args.NavBarTitle;
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("company.closewin", closeWin);
        $.destroy();
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("company.closewin", closeWin);
        initController();
    });
    __defers["$.__views.buttonBack!click!closeWin"] && $.__views.buttonBack.addEventListener("click", closeWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;