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
    function GetMenuList() {
        var oArgs = {
            Callback: "menus.getmenus_success",
            ErrorCallback: "menus.getmenus_error"
        };
        lib_menu.GetMenuList(oArgs);
    }
    function loadMenuListData() {
        if (aMenuList.length > 0) {
            var data = [], args = {};
            _.each(aMenuList, function(oData) {
                args = {
                    oData: oData
                };
                var row = Alloy.createController("rowgeneric1", args).getView();
                row.data = oData;
                data.push(row);
            });
            $.tableviewMenuList.editable = false;
            $.tableviewMenuList.setData(data);
            oMenu = $.tableviewMenuList.data[0].rows[0].data;
        } else {
            $.tableviewMenu.setData([]);
            $.tableviewMenuList.setData([]);
        }
    }
    function getmenus_success(e) {
        aMenuList = e.oData.aMenuList;
        loadMenuListData();
    }
    function getmenus_error(e) {
        Ti.API.info(e);
    }
    function reordermenu_success(e) {
        Ti.API.info(e);
    }
    function reordermenu_error(e) {
        Ti.API.info(e);
    }
    function initController() {
        $.viewNoData.visible = true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menus";
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
        id: "win",
        visible: "true"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
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
        layout: "horizontal",
        visible: "true",
        id: "viewData"
    });
    $.__views.win.add($.__views.viewData);
    $.__views.tableviewMenuList = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        top: "-36",
        id: "tableviewMenuList"
    });
    $.__views.viewData.add($.__views.tableviewMenuList);
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
    $.__views.__alloyId81 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId81"
    });
    $.__views.viewNoData.add($.__views.__alloyId81);
    $.__views.__alloyId82 = Ti.UI.createImageView({
        bottom: 20,
        image: "img/list-2-nodata.png",
        id: "__alloyId82"
    });
    $.__views.__alloyId81.add($.__views.__alloyId82);
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
        text: "Contact Appeatize to learn more about our Menus service.",
        id: "labelNoDataMessage"
    });
    $.__views.__alloyId81.add($.__views.labelNoDataMessage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var lib_menu = require("lib_menu");
    var args = ($.win, arguments[0] || {}), aMenuList = [], oMenu = {};
    $.win.title = args.NavBarTitle;
    $.tableviewMenuList.addEventListener("click", function(e) {
        Ti.API.info("e.row");
        Ti.API.info(e.detail);
        oMenu = e.row.data || {};
        GetReadOnlyMenu();
    });
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("menus.closewin", closeWin);
        Ti.App.removeEventListener("menus.initcontroller", initController);
        Ti.App.removeEventListener("menus.getmenus_success", getmenus_success);
        Ti.App.removeEventListener("menus.getmenus_error", getmenus_error);
        Ti.App.removeEventListener("menus.reordermenu_success", reordermenu_success);
        Ti.App.removeEventListener("menus.reordermenu_error", reordermenu_error);
        Ti.App.removeEventListener("menus.getmenulist", GetMenuList);
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("menus.closewin", closeWin);
        Ti.App.addEventListener("menus.initcontroller", initController);
        Ti.App.addEventListener("menus.getmenus_success", getmenus_success);
        Ti.App.addEventListener("menus.getmenus_error", getmenus_error);
        Ti.App.addEventListener("menus.reordermenu_success", reordermenu_success);
        Ti.App.addEventListener("menus.reordermenu_error", reordermenu_error);
        Ti.App.addEventListener("menus.getmenulist", GetMenuList);
        initController();
    });
    __defers["$.__views.buttonBack!click!closeWin"] && $.__views.buttonBack.addEventListener("click", closeWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;