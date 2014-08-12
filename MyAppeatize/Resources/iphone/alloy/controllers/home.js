function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function GetAdminLocation() {
        var oArgs = {
            Callback: "home.getadminlocation_success",
            ErrorCallback: "home.getadminlocation_error"
        };
        lib_adminlocation.GetAdminLocation(oArgs);
    }
    function openMenu() {
        openNext("Menus", "menus");
    }
    function openAccount() {
        openNext("Account", "account");
    }
    function openCompany() {
        openNext("Company", "company");
    }
    function openCampaigns() {
        openNext("Campaigns", "campaigns");
    }
    function openNext(NavBarTitle, Controller) {
        var nextController = Alloy.createController(Controller, {
            parentWin: parentWin,
            NavBarTitle: NavBarTitle
        });
        parentWin.openWindow(nextController.getView());
    }
    function setLocation() {
        Math.floor(1e8 * Math.random() + 1);
        $.imageviewBanner.image = oLocInfo.BannerImage + "?x=4";
        $.labelActionBarTitle.text = oLocInfo.Name;
    }
    function loadData() {
        var data = [];
        _.each(aLoc, function(oData) {
            var args = {
                oData: oData
            };
            oData.RowType;
            var row = Alloy.createController("rowhome", args).getView();
            row.data = oData;
            data.push(row);
        });
        $.tableviewInfo.setData(data);
        $.tableviewInfo.visible = true;
    }
    function getadminlocation_success(e) {
        Ti.API.info(e);
        oLocInfo = e.oData.oLocInfo;
        aLoc = e.oData.aLocGrid;
        setLocation();
        loadData();
    }
    function getadminlocation_error(e) {
        Ti.API.info(e);
    }
    function initController() {
        GetAdminLocation();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "home";
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
        navBarHidden: true,
        tintColor: "#666666",
        navTintColor: "#F7F7F7",
        barColor: "#282828",
        fullscreen: false,
        translucent: false,
        statusBarStyle: Ti.UI.iPhone.StatusBar.LIGHT_CONTENT,
        titleImage: "/images/navtitle-white.png",
        id: "win",
        visible: "true"
    });
    $.__views.win.leftNavButton = void 0;
    $.__views.viewData = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "absolute",
        visible: "true",
        id: "viewData"
    });
    $.__views.win.add($.__views.viewData);
    $.__views.viewHeader = Ti.UI.createView({
        top: 0,
        layout: "absolute",
        height: 160,
        id: "viewHeader"
    });
    $.__views.viewData.add($.__views.viewHeader);
    $.__views.imageviewBanner = Ti.UI.createImageView({
        width: 320,
        height: 160,
        backgroundColor: "#ffffff",
        preventDefaultImage: true,
        hires: true,
        id: "imageviewBanner"
    });
    $.__views.viewHeader.add($.__views.imageviewBanner);
    $.__views.viewNavBar = Ti.UI.createView({
        top: 0,
        left: 0,
        height: 100,
        width: Ti.UI.FILL,
        opacity: "1",
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "50%",
                y: "100%"
            },
            endPoint: {
                x: "50%",
                y: "0%"
            },
            colors: [ {
                color: "transparent"
            }, {
                color: "#080808"
            } ]
        },
        id: "viewNavBar"
    });
    $.__views.viewHeader.add($.__views.viewNavBar);
    $.__views.viewNavBar2 = Ti.UI.createView({
        bottom: 0,
        left: 0,
        height: 0,
        width: Ti.UI.FILL,
        opacity: "1",
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "50%",
                y: "0%"
            },
            endPoint: {
                x: "50%",
                y: "100%"
            },
            colors: [ {
                color: "transparent"
            }, {
                color: "#080808"
            } ]
        },
        id: "viewNavBar2"
    });
    $.__views.viewHeader.add($.__views.viewNavBar2);
    $.__views.viewOverlayBanner = Ti.UI.createView({
        id: "viewOverlayBanner"
    });
    $.__views.viewHeader.add($.__views.viewOverlayBanner);
    $.__views.labelLocationName = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#ffffff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 18,
            fontWeight: "bold"
        },
        left: 45,
        right: 45,
        top: 31,
        id: "labelLocationName"
    });
    $.__views.viewHeader.add($.__views.labelLocationName);
    $.__views.imageviewNavBarTitle = Ti.UI.createImageView({
        top: 31,
        image: "images/navtitle-white.png",
        id: "imageviewNavBarTitle"
    });
    $.__views.viewHeader.add($.__views.imageviewNavBarTitle);
    $.__views.viewActionBarTitle = Ti.UI.createView({
        height: 34,
        bottom: 50,
        id: "viewActionBarTitle"
    });
    $.__views.viewHeader.add($.__views.viewActionBarTitle);
    $.__views.__alloyId53 = Ti.UI.createView({
        backgroundColor: "#000000",
        opacity: ".6",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "__alloyId53"
    });
    $.__views.viewActionBarTitle.add($.__views.__alloyId53);
    $.__views.labelActionBarTitle = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#FFFFFF",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 18
        },
        id: "labelActionBarTitle"
    });
    $.__views.viewActionBarTitle.add($.__views.labelActionBarTitle);
    $.__views.viewHLineActionBarTitle = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        top: 0,
        id: "viewHLineActionBarTitle"
    });
    $.__views.viewActionBarTitle.add($.__views.viewHLineActionBarTitle);
    $.__views.viewActionBar = Ti.UI.createView({
        height: 50,
        bottom: 0,
        id: "viewActionBar"
    });
    $.__views.viewHeader.add($.__views.viewActionBar);
    $.__views.__alloyId54 = Ti.UI.createView({
        backgroundColor: "#000000",
        opacity: ".6",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "__alloyId54"
    });
    $.__views.viewActionBar.add($.__views.__alloyId54);
    $.__views.viewButtonContainer = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "horizontal",
        id: "viewButtonContainer"
    });
    $.__views.viewActionBar.add($.__views.viewButtonContainer);
    $.__views.__alloyId55 = Ti.UI.createView({
        width: "25%",
        height: 44,
        layout: "absolute",
        backgroundColor: "#40AB2B",
        top: 20,
        left: 20,
        right: 20,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "__alloyId55"
    });
    $.__views.viewButtonContainer.add($.__views.__alloyId55);
    $.__views.buttonMenuAction = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        tintColor: "#FFFFFF",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        image: "img/list-2.png",
        id: "buttonMenuAction"
    });
    $.__views.__alloyId55.add($.__views.buttonMenuAction);
    openMenu ? $.__views.buttonMenuAction.addEventListener("click", openMenu) : __defers["$.__views.buttonMenuAction!click!openMenu"] = true;
    $.__views.__alloyId56 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        right: 0,
        backgroundColor: "#FFFFFF",
        id: "__alloyId56"
    });
    $.__views.__alloyId55.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createView({
        width: "25%",
        height: 44,
        layout: "absolute",
        backgroundColor: "#40AB2B",
        top: 20,
        left: 20,
        right: 20,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "__alloyId57"
    });
    $.__views.viewButtonContainer.add($.__views.__alloyId57);
    $.__views.buttonCompanyAction = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        tintColor: "#FFFFFF",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        image: "img/flag-1.png",
        id: "buttonCompanyAction"
    });
    $.__views.__alloyId57.add($.__views.buttonCompanyAction);
    openCompany ? $.__views.buttonCompanyAction.addEventListener("click", openCompany) : __defers["$.__views.buttonCompanyAction!click!openCompany"] = true;
    $.__views.__alloyId58 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        right: 0,
        backgroundColor: "#FFFFFF",
        id: "__alloyId58"
    });
    $.__views.__alloyId57.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createView({
        width: "25%",
        height: 44,
        layout: "absolute",
        backgroundColor: "#40AB2B",
        top: 20,
        left: 20,
        right: 20,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "__alloyId59"
    });
    $.__views.viewButtonContainer.add($.__views.__alloyId59);
    $.__views.buttonCampaignAction = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        tintColor: "#FFFFFF",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        image: "img/megaphone-1.png",
        id: "buttonCampaignAction"
    });
    $.__views.__alloyId59.add($.__views.buttonCampaignAction);
    openCampaigns ? $.__views.buttonCampaignAction.addEventListener("click", openCampaigns) : __defers["$.__views.buttonCampaignAction!click!openCampaigns"] = true;
    $.__views.__alloyId60 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        right: 0,
        backgroundColor: "#FFFFFF",
        id: "__alloyId60"
    });
    $.__views.__alloyId59.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createView({
        width: "25%",
        height: 44,
        layout: "absolute",
        backgroundColor: "#40AB2B",
        top: 20,
        left: 20,
        right: 20,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "__alloyId61"
    });
    $.__views.viewButtonContainer.add($.__views.__alloyId61);
    $.__views.buttonAccountAction = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        tintColor: "#FFFFFF",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        image: "img/account.png",
        id: "buttonAccountAction"
    });
    $.__views.__alloyId61.add($.__views.buttonAccountAction);
    openAccount ? $.__views.buttonAccountAction.addEventListener("click", openAccount) : __defers["$.__views.buttonAccountAction!click!openAccount"] = true;
    $.__views.viewHLineBottom = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        top: 0,
        backgroundColor: "#FFFFFF",
        id: "viewHLineBottom"
    });
    $.__views.viewActionBar.add($.__views.viewHLineBottom);
    $.__views.tableviewInfo = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.PLAIN,
        top: 160,
        visible: false,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "tableviewInfo"
    });
    $.__views.viewData.add($.__views.tableviewInfo);
    $.__views.tab = Ti.UI.createTab({
        title: "Home",
        icon: "img/house-2.png",
        activeIcon: "img/house-2-fill.png",
        window: $.__views.win,
        id: "tab"
    });
    $.__views.tab && $.addTopLevelView($.__views.tab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var lib_adminlocation = require("lib_adminlocation");
    var parentWin = (arguments[0] || {}, $.tab), oLocInfo = {}, aLoc = [];
    $.tableviewInfo.addEventListener("click", function(e) {
        Ti.API.info(e.row.data);
        var oRowData = e.row.data;
        "Orders" == oRowData.Header ? Ti.App.fireEvent("start1.setactivetab", {
            ActiveTab: 1
        }) : "Reservations" == oRowData.Header && Ti.App.fireEvent("start1.setactivetab", {
            ActiveTab: 2
        });
    });
    $.win.addEventListener("focus", function() {
        GetAdminLocation();
    });
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("home.initcontroller", initController);
        Ti.App.removeEventListener("home.getadminlocation_success", getadminlocation_success);
        Ti.App.removeEventListener("home.getadminlocation_error", getadminlocation_error);
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("home.initcontroller", initController);
        Ti.App.addEventListener("home.getadminlocation_success", getadminlocation_success);
        Ti.App.addEventListener("home.getadminlocation_error", getadminlocation_error);
        initController();
    });
    __defers["$.__views.buttonMenuAction!click!openMenu"] && $.__views.buttonMenuAction.addEventListener("click", openMenu);
    __defers["$.__views.buttonCompanyAction!click!openCompany"] && $.__views.buttonCompanyAction.addEventListener("click", openCompany);
    __defers["$.__views.buttonCampaignAction!click!openCampaigns"] && $.__views.buttonCampaignAction.addEventListener("click", openCampaigns);
    __defers["$.__views.buttonAccountAction!click!openAccount"] && $.__views.buttonAccountAction.addEventListener("click", openAccount);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;