function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doDelete() {
        UpdateOrderStatus(true);
    }
    function UpdateOrderStatus(IsDelete) {
        showLoading("Updating...");
        Ti.API.info("UpdateOrderStatus");
        var oArgs = {
            OrderId: oOrder.OrderId,
            IsDelete: IsDelete,
            Callback: "orders.updateorderstatus_success",
            ErrorCallback: "orders.updateorderstatus_error"
        };
        lib_ordertext.UpdateOrderStatus(oArgs);
    }
    function GetOrderByLocation() {
        var DtNow = moment().format("YYYY-MM-DD HH:mm:ss");
        Ti.API.info("GetOrderByLocation");
        var oArgs = {
            DtNow: DtNow,
            Callback: "orders.getorderbylocation_success",
            ErrorCallback: "orders.getorderbylocation_error"
        };
        lib_ordertext.GetOrderByLocation(oArgs);
    }
    function loadOrders() {
        if (aOrders.length > 0) {
            var data = [], args = {};
            _.each(aOrders, function(oData) {
                args = {
                    oData: oData
                };
                var row = Alloy.createController("roworder", args).getView();
                row.data = oData;
                data.push(row);
            });
            $.tableviewOrders.setData(data);
            $.viewData.visible = true;
            $.viewNoData.visible = false;
        } else {
            $.tableviewOrders.setData([]);
            $.viewNoData.visible = true;
            $.viewData.visible = false;
        }
    }
    function getorderbylocation_success(e) {
        Ti.API.info(e);
        hideLoading();
        aOrders = e.oData.aOrder;
        loadOrders();
    }
    function getorderbylocation_error(e) {
        Ti.API.info(e);
        hideLoading();
    }
    function updateorderstatus_success(e) {
        Ti.API.info(e);
        GetOrderByLocation();
    }
    function updateorderstatus_error(e) {
        Ti.API.info(e);
    }
    function openOrderDetail() {
        var nextController = Alloy.createController("orderdetail", {
            parentWin: parentWin,
            NavBarTitle: oOrder.OrderNumber + " - " + oOrder.TimeText,
            OrderId: oOrder.OrderId
        });
        parentWin.openWindow(nextController.getView());
    }
    function doOpenOrderDetail(e) {
        Ti.API.info("doOpenOrderDetail");
        Ti.API.info(e);
        oOrder = e.oData || {};
        openOrderDetail();
    }
    function doUpdateOrderStatus(e) {
        Ti.API.info(e);
        oOrder = e.oData || {};
        UpdateOrderStatus(false);
    }
    function doRefresh() {
        GetOrderByLocation();
    }
    function initController() {
        Ti.API.info("initController");
        GetOrderByLocation();
    }
    function showLoading() {
        $.activityindicatorLoading.show();
        $.viewLoading.visible = true;
    }
    function hideLoading() {
        $.viewLoading.visible = false;
        $.activityindicatorLoading.hide();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "orders";
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
        title: "Orders",
        id: "win",
        visible: "true"
    });
    $.__views.buttonRefresh = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        image: "/img/refresh.png",
        id: "buttonRefresh"
    });
    doRefresh ? $.__views.buttonRefresh.addEventListener("click", doRefresh) : __defers["$.__views.buttonRefresh!click!doRefresh"] = true;
    $.__views.win.rightNavButton = $.__views.buttonRefresh;
    $.__views.dialogDeleteActions = Ti.UI.createOptionDialog({
        title: "Are you sure you want to delete this order...?",
        destructive: 0,
        options: [ "Yes, delete order", "No" ],
        id: "dialogDeleteActions"
    });
    $.__views.viewData = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        visible: false,
        id: "viewData"
    });
    $.__views.win.add($.__views.viewData);
    $.__views.tableviewOrders = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        top: "-36",
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "tableviewOrders"
    });
    $.__views.viewData.add($.__views.tableviewOrders);
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
    $.__views.__alloyId88 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId88"
    });
    $.__views.viewNoData.add($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createImageView({
        bottom: 20,
        image: "img/check-2-nodata.png",
        id: "__alloyId89"
    });
    $.__views.__alloyId88.add($.__views.__alloyId89);
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
        text: "There are currently no open orders.",
        id: "labelNoDataMessage"
    });
    $.__views.__alloyId88.add($.__views.labelNoDataMessage);
    $.__views.tab = Ti.UI.createTab({
        title: "Orders",
        icon: "img/orders.png",
        activeIcon: "img/orders-fill.png",
        window: $.__views.win,
        id: "tab"
    });
    $.__views.tab && $.addTopLevelView($.__views.tab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var lib_ordertext = require("lib_ordertext"), moment = require("alloy/moment");
    var parentWin = $.tab, aOrders = (arguments[0] || {}, []), oOrder = {};
    $.dialogDeleteActions.addEventListener("click", function(e) {
        0 == e.index && doDelete();
    });
    $.win.addEventListener("focus", function() {
        GetOrderByLocation();
    });
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("orders.initcontroller", initController);
        Ti.App.removeEventListener("orders.getorderbylocation_success", getorderbylocation_success);
        Ti.App.removeEventListener("orders.getorderbylocation_error", getorderbylocation_error);
        Ti.App.removeEventListener("orders.updateorderstatus_success", updateorderstatus_success);
        Ti.App.removeEventListener("orders.updateorderstatus_error", updateorderstatus_error);
        Ti.App.removeEventListener("orders.openorderdetail", doOpenOrderDetail);
        Ti.App.removeEventListener("orders.updateorderstatus", doUpdateOrderStatus);
        Ti.App.removeEventListener("orders.getorderbylocation", GetOrderByLocation);
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("orders.initcontroller", initController);
        Ti.App.addEventListener("orders.getorderbylocation_success", getorderbylocation_success);
        Ti.App.addEventListener("orders.getorderbylocation_error", getorderbylocation_error);
        Ti.App.addEventListener("orders.updateorderstatus_success", updateorderstatus_success);
        Ti.App.addEventListener("orders.updateorderstatus_error", updateorderstatus_error);
        Ti.App.addEventListener("orders.openorderdetail", doOpenOrderDetail);
        Ti.App.addEventListener("orders.updateorderstatus", doUpdateOrderStatus);
        Ti.App.addEventListener("orders.getorderbylocation", GetOrderByLocation);
    });
    __defers["$.__views.buttonRefresh!click!doRefresh"] && $.__views.buttonRefresh.addEventListener("click", doRefresh);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;