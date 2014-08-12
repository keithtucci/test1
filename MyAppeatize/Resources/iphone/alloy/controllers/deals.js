function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "deals";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
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
        title: "Deals",
        id: "win",
        visible: "true"
    });
    $.__views.viewData = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        visible: "false",
        id: "viewData"
    });
    $.__views.win.add($.__views.viewData);
    $.__views.viewNoData = Ti.UI.createView({
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "absolute",
        visible: false,
        id: "viewNoData"
    });
    $.__views.win.add($.__views.viewNoData);
    $.__views.__alloyId50 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId50"
    });
    $.__views.viewNoData.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createImageView({
        bottom: 20,
        image: "img/tag-1-nodata.png",
        id: "__alloyId51"
    });
    $.__views.__alloyId50.add($.__views.__alloyId51);
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
        text: "Contact Appeatize to learn more about our Deals service.",
        id: "labelNoDataMessage"
    });
    $.__views.__alloyId50.add($.__views.labelNoDataMessage);
    $.__views.tab = Ti.UI.createTab({
        title: "Deals",
        icon: "img/deals.png",
        activeIcon: "img/deals-fill.png",
        window: $.__views.win,
        id: "tab"
    });
    $.__views.tab && $.addTopLevelView($.__views.tab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.viewNoData.visible = true;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;