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
    function GetCampaignByLoc() {
        var DtNow = moment().format("YYYY-MM-DD HH:mm:ss");
        Ti.API.info("GetCampaignByLoc");
        var oArgs = {
            DtNow: DtNow,
            Callback: "campaigns.getcampaignbyloc_success",
            ErrorCallback: "campaigns.getcampaignbyloc_error"
        };
        lib_campaign.GetCampaignByLoc(oArgs);
    }
    function openAddCampaign(e) {
        Ti.API.info(e);
        var Id = 0;
        null != e.CampaignId && e.CampaignId > 0 && (Id = e.CampaignId);
        openNext("Add Campaign", "addcampaign", Id);
    }
    function openNext(NavBarTitle, Controller, Id) {
        var nextController = Alloy.createController(Controller, {
            NavBarTitle: NavBarTitle,
            parentWin: parentWin,
            Id: Id
        });
        parentWin.openWindow(nextController.getView());
    }
    function loadData() {
        if (aCampaign.length > 0) {
            var data = [], args = {};
            _.each(aCampaign, function(oData) {
                args = {
                    oData: oData
                };
                var row = Alloy.createController("rowcampaign", args).getView();
                row.data = oData;
                data.push(row);
            });
            $.tableview.setData(data);
            $.viewData.visible = true;
            $.viewNoData.visible = false;
        } else {
            $.tableview.setData([]);
            $.viewNoData.visible = true;
            $.viewData.visible = false;
        }
    }
    function getcampaignbyloc_success(e) {
        Ti.API.info(e);
        hideLoading();
        aCampaign = e.oData.aCampaign;
        loadData();
    }
    function getcampaignbyloc_error(e) {
        Ti.API.info(e);
        hideLoading();
    }
    function hideLoading() {
        $.activityindicatorLoading.hide();
    }
    function initController() {
        GetCampaignByLoc();
    }
    function doRefresh() {
        GetCampaignByLoc();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "campaigns";
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
    $.__views.buttonAdd = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
        title: "Add",
        id: "buttonAdd"
    });
    openAddCampaign ? $.__views.buttonAdd.addEventListener("click", openAddCampaign) : __defers["$.__views.buttonAdd!click!openAddCampaign"] = true;
    $.__views.win.rightNavButton = $.__views.buttonAdd;
    $.__views.viewData = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        visible: true,
        id: "viewData"
    });
    $.__views.win.add($.__views.viewData);
    $.__views.tableview = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        top: "-36",
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
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
    $.__views.__alloyId41 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId41"
    });
    $.__views.viewNoData.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createImageView({
        bottom: 20,
        image: "img/megaphone-1-nodata.png",
        id: "__alloyId42"
    });
    $.__views.__alloyId41.add($.__views.__alloyId42);
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
        text: "Contact Appeatize to learn more about our Campaigns service.",
        id: "labelNoDataMessage"
    });
    $.__views.__alloyId41.add($.__views.labelNoDataMessage);
    var __alloyId45 = [];
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
    __alloyId45.push($.__views.buttonRefresh);
    doRefresh ? $.__views.buttonRefresh.addEventListener("click", doRefresh) : __defers["$.__views.buttonRefresh!click!doRefresh"] = true;
    $.__views.__alloyId46 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId45.push($.__views.__alloyId46);
    $.__views.__alloyId43 = Ti.UI.iOS.createToolbar({
        bottom: 0,
        borderTop: false,
        borderBottom: false,
        borderColor: "#D0D1D5",
        barColor: "#F7F7F7",
        tintColor: "#666666",
        items: __alloyId45,
        id: "__alloyId43"
    });
    $.__views.win.add($.__views.__alloyId43);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var lib_campaign = require("lib_campaign"), moment = require("alloy/moment");
    var args = arguments[0] || {}, parentWin = args.parentWin, aCampaign = [];
    $.win.title = args.NavBarTitle;
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("campaigns.closewin", closeWin);
        Ti.App.removeEventListener("campaigns.dorefresh", doRefresh);
        Ti.App.removeEventListener("campaigns.getcampaignbyloc_success", getcampaignbyloc_success);
        Ti.App.removeEventListener("campaigns.getcampaignbyloc_error", getcampaignbyloc_error);
        Ti.App.removeEventListener("campaigns.openaddcampaign", openAddCampaign);
        $.destroy();
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("campaigns.closewin", closeWin);
        Ti.App.addEventListener("campaigns.dorefresh", doRefresh);
        Ti.App.addEventListener("campaigns.getcampaignbyloc_success", getcampaignbyloc_success);
        Ti.App.addEventListener("campaigns.getcampaignbyloc_error", getcampaignbyloc_error);
        Ti.App.addEventListener("campaigns.openaddcampaign", openAddCampaign);
        initController();
    });
    __defers["$.__views.buttonBack!click!closeWin"] && $.__views.buttonBack.addEventListener("click", closeWin);
    __defers["$.__views.buttonAdd!click!openAddCampaign"] && $.__views.buttonAdd.addEventListener("click", openAddCampaign);
    __defers["$.__views.buttonRefresh!click!doRefresh"] && $.__views.buttonRefresh.addEventListener("click", doRefresh);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;