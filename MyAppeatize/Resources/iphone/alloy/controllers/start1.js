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
        $.tabgroup.close();
    }
    function activeTab(ActiveTab) {
        $.tabgroup.activeTab = ActiveTab;
    }
    function setActiveTab(e) {
        Ti.API.info(e);
        var ActiveTab = e.ActiveTab;
        activeTab(ActiveTab);
    }
    function initController() {
        Ti.App.fireEvent("home.initcontroller");
        Ti.App.fireEvent("orders.initcontroller");
        Ti.App.fireEvent("reservations.initcontroller");
        Ti.App.fireEvent("loyalty.initcontroller");
        Ti.App.fireEvent("deals.initcontroller");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "start1";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
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
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    var __alloyId109 = [];
    $.__views.home = Alloy.createController("home", {
        id: "home",
        __parentSymbol: __parentSymbol
    });
    __alloyId109.push($.__views.home.getViewEx({
        recurse: true
    }));
    $.__views.orders = Alloy.createController("orders", {
        id: "orders",
        __parentSymbol: __parentSymbol
    });
    __alloyId109.push($.__views.orders.getViewEx({
        recurse: true
    }));
    $.__views.reservations = Alloy.createController("reservations", {
        id: "reservations",
        __parentSymbol: __parentSymbol
    });
    __alloyId109.push($.__views.reservations.getViewEx({
        recurse: true
    }));
    $.__views.loyalty = Alloy.createController("loyalty", {
        id: "loyalty",
        __parentSymbol: __parentSymbol
    });
    __alloyId109.push($.__views.loyalty.getViewEx({
        recurse: true
    }));
    $.__views.deals = Alloy.createController("deals", {
        id: "deals",
        __parentSymbol: __parentSymbol
    });
    __alloyId109.push($.__views.deals.getViewEx({
        recurse: true
    }));
    $.__views.tabgroup = Ti.UI.createTabGroup({
        barColor: "#FFFFFF",
        tintColor: "#282828",
        tabs: __alloyId109,
        id: "tabgroup",
        visible: "true"
    });
    $.__views.win.add($.__views.tabgroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabgroup.addEventListener("close", function() {
        Ti.App.removeEventListener("start1.closewin", closeWin);
        Ti.App.removeEventListener("start1.setactivetab", setActiveTab);
    });
    $.tabgroup.addEventListener("open", function() {
        Ti.App.addEventListener("start1.closewin", closeWin);
        Ti.App.addEventListener("start1.setactivetab", setActiveTab);
        initController();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;