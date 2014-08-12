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
    function doPhone() {
        var PhoneNumber = oOrder.Phone;
        var CleanPhoneNumber = PhoneNumber.replace(/[^\d]/g, "");
        Ti.API.info(CleanPhoneNumber);
        Titanium.Platform.openURL("tel:" + CleanPhoneNumber);
    }
    function doDelete() {
        UpdateOrderStatus(true);
    }
    function UpdateOrderStatus(IsDelete) {
        showLoading();
        Ti.API.info("UpdateOrderStatus");
        var oArgs = {
            OrderId: OrderId,
            IsDelete: IsDelete,
            Callback: "orderdetail.updateorderstatus_success",
            ErrorCallback: "orderdetail.updateorderstatus_error"
        };
        lib_ordertext.UpdateOrderStatus(oArgs);
    }
    function updateorderstatus_success(e) {
        Ti.API.info(e);
        hideLoading();
        GetOrderDetail();
    }
    function updateorderstatus_error(e) {
        Ti.API.info(e);
        hideLoading();
    }
    function GetOrderDetail() {
        var DtNow = moment().format("YYYY-MM-DD HH:mm:ss");
        var oArgs = {
            OrderId: OrderId,
            DtNow: DtNow,
            Callback: "orderdetail.getorderdetail_success",
            ErrorCallback: "orderdetail.getorderdetail_error"
        };
        lib_ordertext.GetOrderDetail(oArgs);
    }
    function loadData() {
        $.labelOrderStatusName.text = oOrder.OrderStatusName;
        $.labelName.text = oOrder.Name;
        $.buttonPhone.title = "  " + oOrder.Phone;
        $.labelDtCreated.text = moment(oOrder.DtCreated).fromNow();
        $.textareaOrderText.value = oOrder.OrderText;
        if ("" != oOrder.NextStatusName) {
            $.viewAction.backgroundColor = oOrder.ColorHex;
            $.buttonAction.title = oOrder.NextStatusName;
            $.viewAction.width = 120;
            $.viewRowMain.right = 130;
        } else {
            $.viewAction.enabled = false;
            $.viewAction.visible = false;
            $.viewAction.width = 0;
            $.viewRowMain.right = 10;
        }
        $.viewData.visible = true;
    }
    function getorderdetail_success(e) {
        Ti.API.info("getorderdetail_success");
        Ti.API.info(e);
        oOrder = e.oData.oOrder;
        Ti.API.info(oOrder);
        loadData();
        hideLoading();
    }
    function getorderdetail_error(e) {
        Ti.API.info(e);
        hideLoading();
    }
    function initController() {
        Ti.API.info("initController");
        GetOrderDetail();
    }
    function showLoading() {
        $.activityindicatorLoading.show();
        $.viewLoading.visible = true;
    }
    function hideLoading() {
        $.viewLoading.visible = false;
        $.activityindicatorLoading.hide();
    }
    function doUpdateOrderStatus() {
        UpdateOrderStatus(false);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "orderdetail";
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
    $.__views.buttonPrint = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        image: "/img/printer.png",
        id: "buttonPrint"
    });
    $.__views.win.rightNavButton = $.__views.buttonPrint;
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
        visible: "false",
        id: "viewData"
    });
    $.__views.win.add($.__views.viewData);
    var __alloyId85 = [];
    $.__views.tableviewrowOrderData = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 120,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "tableviewrowOrderData"
    });
    __alloyId85.push($.__views.tableviewrowOrderData);
    $.__views.viewRowMain = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        top: 10,
        bottom: 10,
        left: 15,
        right: 10,
        id: "viewRowMain"
    });
    $.__views.tableviewrowOrderData.add($.__views.viewRowMain);
    $.__views.labelOrderStatusName = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: 20,
        highlightedColor: "#fff",
        color: "#AAAAAA",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        wordWrap: false,
        ellipsize: true,
        id: "labelOrderStatusName"
    });
    $.__views.viewRowMain.add($.__views.labelOrderStatusName);
    $.__views.labelName = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: 20,
        highlightedColor: "#fff",
        color: "#AAAAAA",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        wordWrap: false,
        ellipsize: true,
        id: "labelName"
    });
    $.__views.viewRowMain.add($.__views.labelName);
    $.__views.labelDtCreated = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: 20,
        highlightedColor: "#fff",
        color: "#AAAAAA",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        wordWrap: false,
        ellipsize: true,
        id: "labelDtCreated"
    });
    $.__views.viewRowMain.add($.__views.labelDtCreated);
    $.__views.buttonPhone = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        top: 8,
        left: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        image: "/images/phone.png",
        id: "buttonPhone"
    });
    $.__views.viewRowMain.add($.__views.buttonPhone);
    doPhone ? $.__views.buttonPhone.addEventListener("click", doPhone) : __defers["$.__views.buttonPhone!click!doPhone"] = true;
    $.__views.viewAction = Ti.UI.createView({
        right: 0,
        width: 0,
        height: Ti.UI.FILL,
        id: "viewAction"
    });
    $.__views.tableviewrowOrderData.add($.__views.viewAction);
    doUpdateOrderStatus ? $.__views.viewAction.addEventListener("click", doUpdateOrderStatus) : __defers["$.__views.viewAction!click!doUpdateOrderStatus"] = true;
    $.__views.buttonAction = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        image: "/images/702-share.png",
        tintColor: "#FFFFFF",
        id: "buttonAction"
    });
    $.__views.viewAction.add($.__views.buttonAction);
    $.__views.viewHLineBottom = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        bottom: 0,
        id: "viewHLineBottom"
    });
    $.__views.tableviewrowOrderData.add($.__views.viewHLineBottom);
    $.__views.__alloyId86 = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "__alloyId86"
    });
    __alloyId85.push($.__views.__alloyId86);
    $.__views.textareaOrderText = Ti.UI.createTextArea({
        scrollable: true,
        height: Ti.UI.FILL,
        color: "#177EFB",
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#fff",
        borderWidth: 1,
        enableReturnKey: true,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        font: {
            fontSize: 20
        },
        top: 10,
        left: 10,
        bottom: 10,
        editable: false,
        id: "textareaOrderText"
    });
    $.__views.__alloyId86.add($.__views.textareaOrderText);
    $.__views.tableview = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        top: "-36",
        scrollable: false,
        separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
        data: __alloyId85,
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
    var lib_ordertext = require("lib_ordertext"), moment = require("alloy/moment");
    var args = ($.tab, arguments[0] || {}), oOrder = {}, OrderId = args.OrderId;
    $.win.title = args.NavBarTitle;
    $.dialogDeleteActions.addEventListener("click", function(e) {
        0 == e.index && doDelete();
    });
    $.win.addEventListener("focus", function() {});
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("orderdetail.initcontroller", initController);
        Ti.App.removeEventListener("orderdetail.getorderdetail_success", getorderdetail_success);
        Ti.App.removeEventListener("orderdetail.getorderdetail_error", getorderdetail_error);
        Ti.App.removeEventListener("orderdetail.updateorderstatus_success", updateorderstatus_success);
        Ti.App.removeEventListener("orderdetail.updateorderstatus_error", updateorderstatus_error);
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("orderdetail.initcontroller", initController);
        Ti.App.addEventListener("orderdetail.getorderdetail_success", getorderdetail_success);
        Ti.App.addEventListener("orderdetail.getorderdetail_error", getorderdetail_error);
        Ti.App.addEventListener("orderdetail.updateorderstatus_success", updateorderstatus_success);
        Ti.App.addEventListener("orderdetail.updateorderstatus_error", updateorderstatus_error);
        initController();
    });
    __defers["$.__views.buttonBack!click!closeWin"] && $.__views.buttonBack.addEventListener("click", closeWin);
    __defers["$.__views.buttonPhone!click!doPhone"] && $.__views.buttonPhone.addEventListener("click", doPhone);
    __defers["$.__views.viewAction!click!doUpdateOrderStatus"] && $.__views.viewAction.addEventListener("click", doUpdateOrderStatus);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;