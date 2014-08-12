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
            animated: false
        });
    }
    function loadData() {
        var data = [];
        _.each(Locations, function(oData) {
            Ti.API.info(oData);
            var row = Alloy.createController("tableviewrow", args).getView();
            row.data = oData;
            row.title = oData.Name;
            row.hasChild = true;
            data.push(row);
        });
        $.tableview.setData(data);
    }
    function SetLocation(LocationId) {
        var oArgs = {
            LocationId: LocationId,
            Callback: "locations.setlocation_success",
            ErrorCallback: "locations.setlocation_error"
        };
        lib_session.SetLocation(oArgs);
    }
    function initController() {
        loadData();
    }
    function setlocation_success(e) {
        Ti.API.info(e);
        Ti.App.fireEvent("company.initcontroller");
        Ti.App.fireEvent("menus.initcontroller");
        Ti.App.fireEvent("orders.initcontroller");
        closeWin();
    }
    function setlocation_error(e) {
        Ti.API.info(e);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "locations";
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
        tabBarHidden: true,
        navBarHidden: true,
        tintColor: "#666666",
        navTintColor: "#F7F7F7",
        barColor: "#282828",
        fullscreen: false,
        translucent: false,
        statusBarStyle: Ti.UI.iPhone.StatusBar.LIGHT_CONTENT,
        titleImage: "/images/navtitle-white.png",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
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
    $.__views.win.add($.__views.viewData);
    $.__views.tableview = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        width: 320,
        scrollable: false,
        top: 0,
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, Locations = args.Locations || [];
    args.parentWin;
    var lib_session = require("lib_session");
    Ti.API.info(Locations);
    $.tableview.addEventListener("click", function(e) {
        Ti.API.info(e.row.data);
        var LocationId = e.row.data.LocationId || 0;
        Ti.App.Properties.setString("LocationId", LocationId);
        SetLocation(LocationId);
    });
    $.win.addEventListener("focus", function() {});
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("locations.closewin", closeWin);
        Ti.App.removeEventListener("locations.setlocation_success", setlocation_success);
        Ti.App.removeEventListener("locations.setlocation_error", setlocation_error);
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("locations.closewin", closeWin);
        Ti.App.addEventListener("locations.setlocation_success", setlocation_success);
        Ti.App.addEventListener("locations.setlocation_error", setlocation_error);
        initController();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;