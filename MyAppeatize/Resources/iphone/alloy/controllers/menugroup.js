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
    function setMenuGroupMoveable() {
        Ti.API.info($.tableviewMenuGroup.moving);
        if ($.tableviewMenuGroup.moving) {
            ReorderMenuText($.tableviewMenuGroup.data[0]);
            $.tableviewMenuGroup.moving = false;
            $.buttonEditMenuGroup.title = "Edit";
        } else {
            $.buttonEditMenuGroup.title = "Done";
            $.tableviewMenuGroup.moving = true;
        }
        $.buttonEditMenuGroup.width = Ti.UI.SIZE;
    }
    function setMenuItemMoveable() {
        Ti.API.info($.tableviewMenuItem.moving);
        if ($.tableviewMenuItem.moving) {
            ReorderMenuText($.tableviewMenuItem.data[0]);
            $.tableviewMenuItem.moving = false;
            $.buttonEditMenuItem.title = "Edit";
        } else {
            $.buttonEditMenuItem.title = "Done";
            $.tableviewMenuItem.moving = true;
        }
        $.buttonEditMenuItem.width = Ti.UI.SIZE;
    }
    function GetMenuGroup() {
        var oArgs = {
            MenuId: oMenu.MenuId,
            Callback: "menugroups.getmenugroup_success",
            ErrorCallback: "menugroups.getmenugroup_error"
        };
        lib_menu.GetMenuGroup(oArgs);
    }
    function GetMenuItem() {
        setMenuGroupData();
        var oArgs = {
            MenuTextId: oMenuGroup.MenuTextId,
            Callback: "menugroups.getmenuitem_success",
            ErrorCallback: "menugroups.getmenuitem_error"
        };
        lib_menu.GetMenuItem(oArgs);
    }
    function ReorderMenuText(tableviewData) {
        var IdList = "";
        var tableSection = tableviewData;
        for (var j = 0; tableSection.rowCount > j; j++) {
            var row = tableSection.rows[j];
            IdList += row.data.MenuTextId + ",";
        }
        var oArgs = {
            MenuId: oMenu.MenuId,
            MenuTextTypeCode: "",
            IdList: IdList,
            Callback: "menugroups.reordertext_success",
            ErrorCallback: "menugroups.reordertext_error"
        };
        lib_menu.ReorderMenuText(oArgs);
    }
    function loadMenuGroup() {
        if (aMenuGroup.length > 0) {
            var data = [], args = {};
            _.each(aMenuGroup, function(oData) {
                Ti.API.info(oData);
                args = {
                    oData: oData
                };
                var row = Alloy.createController("rowgeneric1", args).getView();
                row.data = oData;
                data.push(row);
            });
            $.tableviewMenuGroup.editable = false;
            $.tableviewMenuGroup.setData(data);
            oMenuGroup = $.tableviewMenuGroup.data[0].rows[0].data;
            GetMenuItem();
        } else {
            $.tableviewMenuItem.setData([]);
            $.tableviewMenuGroup.setData([]);
        }
    }
    function loadMenuItem() {
        if (aMenuItem.length > 0) {
            var data = [], args = {};
            _.each(aMenuItem, function(oData) {
                Ti.API.info(oData);
                args = {
                    oData: oData
                };
                var row = Alloy.createController("rowgeneric2", args).getView();
                row.data = oData;
                data.push(row);
            });
            $.tableviewMenuItem.editable = false;
            $.tableviewMenuItem.setData(data);
        } else $.tableviewMenuItem.setData([]);
    }
    function getmenugroup_success(e) {
        Ti.API.info(e);
        aMenuGroup = e.oData.aMenuGroup;
        loadMenuGroup();
    }
    function getmenugroup_error(e) {
        Ti.API.info(e);
    }
    function getmenuitem_success(e) {
        Ti.API.info(e);
        aMenuItem = e.oData.aMenuItem;
        loadMenuItem();
    }
    function getmenuitem_error(e) {
        Ti.API.info(e);
    }
    function reordertext_success(e) {
        Ti.API.info(e);
    }
    function reordertext_error(e) {
        Ti.API.info(e);
    }
    function addMenuItem() {
        openAddGeneric1("Add Menu Item", "menugroups.getmenuitem", "dish", oMenuGroup.MenuId, oMenuGroup.MenuTextId, oMenuItem.MenuTextId);
    }
    function editMenuItem() {
        openAddGeneric1(oMenu.Name, "menugroups.getmenuitem", "dish", oMenuGroup.MenuId, oMenuGroup.MenuTextId, oMenuItem.MenuTextId, oMenuItem);
    }
    function addMenuGroup() {
        openAddGeneric1("Add Menu Group", "menugroups.getmenugroup", "group", oMenu.MenuId, 0, 0);
    }
    function editMenuGroup() {
        openAddGeneric1(oMenuGroup.Name, "menugroups.getmenugroup", "group", oMenuGroup.MenuId, 0, oMenuGroup.MenuTextId, oMenuGroup);
    }
    function openAddGeneric1(NavBarTitle, Callback, MenuTextTypeCode, MenuId, ParentMenuTextId, MenuTextId, oEditData) {
        var addgeneric1 = Alloy.createController("addgeneric1", {
            NavBarTitle: NavBarTitle,
            Callback: Callback,
            MenuTextTypeCode: MenuTextTypeCode,
            MenuId: MenuId,
            ParentMenuTextId: ParentMenuTextId,
            MenuTextId: MenuTextId,
            oEditData: oEditData
        }).getView();
        addgeneric1.open({
            modal: true,
            animated: true,
            modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
        });
    }
    function setMenuGroupData() {
        $.buttonMenuGroupLabel.title = oMenuGroup.Name;
    }
    function initController() {
        GetMenuGroup();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "menugroup";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win2 = Ti.UI.createWindow({
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
        id: "win2",
        visible: "true"
    });
    $.__views.buttonDown = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        image: "/images/down-arrow-nav2.png",
        id: "buttonDown"
    });
    closeWin ? $.__views.buttonDown.addEventListener("click", closeWin) : __defers["$.__views.buttonDown!click!closeWin"] = true;
    $.__views.win2.leftNavButton = $.__views.buttonDown;
    $.__views.viewData = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "horizontal",
        visible: "true",
        id: "viewData"
    });
    $.__views.win2.add($.__views.viewData);
    $.__views.__alloyId69 = Ti.UI.createView({
        width: 320,
        layout: "vertical",
        id: "__alloyId69"
    });
    $.__views.viewData.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createView({
        backgroundColor: "#F7F7F7",
        width: Ti.UI.FILL,
        height: 44,
        id: "__alloyId70"
    });
    $.__views.__alloyId69.add($.__views.__alloyId70);
    $.__views.buttonEditMenuGroup = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        title: "Move",
        right: 17,
        id: "buttonEditMenuGroup"
    });
    $.__views.__alloyId70.add($.__views.buttonEditMenuGroup);
    setMenuGroupMoveable ? $.__views.buttonEditMenuGroup.addEventListener("click", setMenuGroupMoveable) : __defers["$.__views.buttonEditMenuGroup!click!setMenuGroupMoveable"] = true;
    $.__views.__alloyId71 = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
        title: "Add",
        left: 17,
        id: "__alloyId71"
    });
    $.__views.__alloyId70.add($.__views.__alloyId71);
    addMenuGroup ? $.__views.__alloyId71.addEventListener("click", addMenuGroup) : __defers["$.__views.__alloyId71!click!addMenuGroup"] = true;
    $.__views.__alloyId72 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        id: "__alloyId72"
    });
    $.__views.__alloyId69.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createView({
        backgroundColor: "#FFFFFF",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId73"
    });
    $.__views.__alloyId69.add($.__views.__alloyId73);
    $.__views.tableviewMenuGroup = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        top: "-36",
        id: "tableviewMenuGroup"
    });
    $.__views.__alloyId73.add($.__views.tableviewMenuGroup);
    $.__views.__alloyId74 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        id: "__alloyId74"
    });
    $.__views.viewData.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId75"
    });
    $.__views.viewData.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createView({
        backgroundColor: "#F7F7F7",
        width: Ti.UI.FILL,
        height: 44,
        id: "__alloyId76"
    });
    $.__views.__alloyId75.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
        title: "Add",
        left: 17,
        id: "__alloyId77"
    });
    $.__views.__alloyId76.add($.__views.__alloyId77);
    addMenuItem ? $.__views.__alloyId77.addEventListener("click", addMenuItem) : __defers["$.__views.__alloyId77!click!addMenuItem"] = true;
    $.__views.buttonMenuGroupLabel = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        left: 60,
        right: 60,
        width: Ti.UI.FILL,
        id: "buttonMenuGroupLabel"
    });
    $.__views.__alloyId76.add($.__views.buttonMenuGroupLabel);
    editMenuGroup ? $.__views.buttonMenuGroupLabel.addEventListener("click", editMenuGroup) : __defers["$.__views.buttonMenuGroupLabel!click!editMenuGroup"] = true;
    $.__views.buttonEditMenuItem = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        title: "Move",
        right: 17,
        id: "buttonEditMenuItem"
    });
    $.__views.__alloyId76.add($.__views.buttonEditMenuItem);
    setMenuItemMoveable ? $.__views.buttonEditMenuItem.addEventListener("click", setMenuItemMoveable) : __defers["$.__views.buttonEditMenuItem!click!setMenuItemMoveable"] = true;
    $.__views.__alloyId78 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        id: "__alloyId78"
    });
    $.__views.__alloyId75.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createView({
        backgroundColor: "#FFFFFF",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId79"
    });
    $.__views.__alloyId75.add($.__views.__alloyId79);
    $.__views.tableviewMenuItem = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        top: "-36",
        id: "tableviewMenuItem"
    });
    $.__views.__alloyId79.add($.__views.tableviewMenuItem);
    $.__views.win = Ti.UI.iOS.createNavigationWindow({
        tabBarHidden: true,
        title: "Menu",
        window: $.__views.win2,
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var lib_menu = require("lib_menu");
    var args = arguments[0] || {}, oMenuGroup = {}, aMenuGroup = [], oMenuItem = {}, aMenuItem = [], oMenu = args.oMenu || {};
    $.win2.title = args.NavBarTitle;
    var menuGroupRefreshControl = Ti.UI.createRefreshControl({
        tintColor: "#FC3D39"
    });
    $.tableviewMenuGroup.refreshControl = menuGroupRefreshControl;
    menuGroupRefreshControl.addEventListener("refreshstart", function() {
        GetMenuGroup();
        menuGroupRefreshControl.endRefreshing();
    });
    var menuItemRefreshControl = Ti.UI.createRefreshControl({
        tintColor: "#FC3D39"
    });
    $.tableviewMenuItem.refreshControl = menuItemRefreshControl;
    menuItemRefreshControl.addEventListener("refreshstart", function() {
        GetMenuItem();
        menuItemRefreshControl.endRefreshing();
    });
    $.tableviewMenuGroup.addEventListener("click", function(e) {
        Ti.API.info("e.row");
        oMenuGroup = e.row.data || {};
        GetMenuItem();
    });
    $.tableviewMenuItem.addEventListener("click", function(e) {
        Ti.API.info("e.row");
        oMenuItem = e.row.data || {};
        editMenuItem();
    });
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("menugroups.closewin", closeWin);
        Ti.App.removeEventListener("menugroups.initcontroller", initController);
        Ti.App.removeEventListener("menugroups.getmenugroup_success", getmenugroup_success);
        Ti.App.removeEventListener("menugroups.getmenugroup_error", getmenugroup_error);
        Ti.App.removeEventListener("menugroups.getmenuitem_success", getmenuitem_success);
        Ti.App.removeEventListener("menugroups.getmenuitem_error", getmenuitem_error);
        Ti.App.removeEventListener("menugroups.reordertext_success", reordertext_success);
        Ti.App.removeEventListener("menugroups.reordertext_error", reordertext_error);
        Ti.App.removeEventListener("menugroups.getmenugroup", GetMenuGroup);
        Ti.App.removeEventListener("menugroups.getmenuitem", GetMenuItem);
        Ti.App.fireEvent("menus.getmenulist");
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("menugroups.closewin", closeWin);
        Ti.App.addEventListener("menugroups.initcontroller", initController);
        Ti.App.addEventListener("menugroups.getmenugroup_success", getmenugroup_success);
        Ti.App.addEventListener("menugroups.getmenugroup_error", getmenugroup_error);
        Ti.App.addEventListener("menugroups.getmenuitem_success", getmenuitem_success);
        Ti.App.addEventListener("menugroups.getmenuitem_error", getmenuitem_error);
        Ti.App.addEventListener("menugroups.reordertext_success", reordertext_success);
        Ti.App.addEventListener("menugroups.reordertext_error", reordertext_error);
        Ti.App.addEventListener("menugroups.getmenugroup", GetMenuGroup);
        Ti.App.addEventListener("menugroups.getmenuitem", GetMenuItem);
        initController();
    });
    __defers["$.__views.buttonDown!click!closeWin"] && $.__views.buttonDown.addEventListener("click", closeWin);
    __defers["$.__views.buttonEditMenuGroup!click!setMenuGroupMoveable"] && $.__views.buttonEditMenuGroup.addEventListener("click", setMenuGroupMoveable);
    __defers["$.__views.__alloyId71!click!addMenuGroup"] && $.__views.__alloyId71.addEventListener("click", addMenuGroup);
    __defers["$.__views.__alloyId77!click!addMenuItem"] && $.__views.__alloyId77.addEventListener("click", addMenuItem);
    __defers["$.__views.buttonMenuGroupLabel!click!editMenuGroup"] && $.__views.buttonMenuGroupLabel.addEventListener("click", editMenuGroup);
    __defers["$.__views.buttonEditMenuItem!click!setMenuItemMoveable"] && $.__views.buttonEditMenuItem.addEventListener("click", setMenuItemMoveable);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;