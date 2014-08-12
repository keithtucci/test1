function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setMenusMoveable() {
        Ti.API.info($.tableviewMenuList.moving);
        if ($.tableviewMenuList.moving) {
            ReorderMenuText();
            $.tableviewMenuList.moving = false;
            $.buttonEditMenu.title = "Edit";
        } else {
            $.buttonEditMenu.title = "Done";
            $.tableviewMenuList.moving = true;
        }
        $.buttonEditMenu.width = Ti.UI.SIZE;
    }
    function openMenuGroup() {
        var menugroup = Alloy.createController("menugroup", {
            NavBarTitle: oMenu.Name,
            parentWin: parentWin,
            oMenu: oMenu
        }).getView();
        menugroup.open({
            modal: true,
            animated: true
        });
    }
    function addMenu() {
        openAddGeneric1("Add Menu", "menus.getmenulist", "menu", 0, 0, 0);
    }
    function editMenu() {
        openAddGeneric1(oMenu.Name, "menus.getmenulist", "menu", oMenu.MenuId, 0, 0, oMenu);
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
    function ReorderMenuText() {
        var IdList = "";
        var tableSection = $.tableviewMenuList.data[0];
        for (var j = 0; tableSection.rowCount > j; j++) {
            var row = tableSection.rows[j];
            IdList += row.data.MenuId + ",";
        }
        var oArgs = {
            MenuId: 0,
            MenuTextTypeCode: "menu",
            IdList: IdList,
            Callback: "menus.reordermenu_success",
            ErrorCallback: "menus.reordermenu_error"
        };
        lib_menu.ReorderMenuText(oArgs);
    }
    function GetMenuList() {
        var oArgs = {
            Callback: "menus.getmenus_success",
            ErrorCallback: "menus.getmenus_error"
        };
        lib_menu.GetMenuList(oArgs);
    }
    function GetReadOnlyMenu() {
        setMenuData();
        var oArgs = {
            MenuId: oMenu.MenuId,
            Callback: "menus.getreadonlymenu_success",
            ErrorCallback: "menus.getreadonlymenu_error"
        };
        lib_menu.GetReadOnlyMenu(oArgs);
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
            GetReadOnlyMenu();
        } else {
            $.tableviewMenu.setData([]);
            $.tableviewMenuList.setData([]);
        }
    }
    function loadMenuData() {
        if (aMenu.length > 0) {
            var data = [], args = {};
            _.each(aMenu, function(oData) {
                args = {
                    oData: oData
                };
                var row = Alloy.createController(oData.Controller, args).getView();
                row.data = oData;
                data.push(row);
            });
            $.tableviewMenu.setData(data);
        } else $.tableviewMenu.setData([]);
    }
    function getmenus_success(e) {
        aMenuList = e.oData.aMenuList;
        loadMenuListData();
    }
    function getmenus_error(e) {
        Ti.API.info(e);
    }
    function getreadonlymenu_success(e) {
        Ti.API.info(e);
        aMenu = e.oData.aMenuList;
        loadMenuData();
    }
    function getreadonlymenu_error(e) {
        Ti.API.info(e);
    }
    function reordermenu_success(e) {
        Ti.API.info(e);
    }
    function reordermenu_error(e) {
        Ti.API.info(e);
    }
    function setMenuData() {
        $.buttonMenuLabel.title = oMenu.Name;
    }
    function initController() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "Copy of menus";
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
        title: "Menu",
        id: "win",
        visible: "true"
    });
    $.__views.viewData = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "horizontal",
        visible: "true",
        id: "viewData"
    });
    $.__views.win.add($.__views.viewData);
    $.__views.__alloyId0 = Ti.UI.createView({
        width: 320,
        layout: "vertical",
        id: "__alloyId0"
    });
    $.__views.viewData.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createView({
        backgroundColor: "#F7F7F7",
        width: Ti.UI.FILL,
        height: 44,
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.buttonEditMenu = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        right: 15,
        title: "Move",
        id: "buttonEditMenu"
    });
    $.__views.__alloyId1.add($.__views.buttonEditMenu);
    setMenusMoveable ? $.__views.buttonEditMenu.addEventListener("click", setMenusMoveable) : __defers["$.__views.buttonEditMenu!click!setMenusMoveable"] = true;
    $.__views.__alloyId2 = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        left: 15,
        style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
        title: "Add",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    addMenu ? $.__views.__alloyId2.addEventListener("click", addMenu) : __defers["$.__views.__alloyId2!click!addMenu"] = true;
    $.__views.__alloyId3 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        id: "__alloyId3"
    });
    $.__views.__alloyId0.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createView({
        backgroundColor: "#FFFFFF",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId4"
    });
    $.__views.__alloyId0.add($.__views.__alloyId4);
    $.__views.tableviewMenuList = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        top: "-36",
        id: "tableviewMenuList"
    });
    $.__views.__alloyId4.add($.__views.tableviewMenuList);
    $.__views.__alloyId5 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        id: "__alloyId5"
    });
    $.__views.viewData.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId6"
    });
    $.__views.viewData.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createView({
        backgroundColor: "#F7F7F7",
        width: Ti.UI.FILL,
        height: 44,
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.buttonMenuLabel = Ti.UI.createButton({
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
        id: "buttonMenuLabel"
    });
    $.__views.__alloyId7.add($.__views.buttonMenuLabel);
    editMenu ? $.__views.buttonMenuLabel.addEventListener("click", editMenu) : __defers["$.__views.buttonMenuLabel!click!editMenu"] = true;
    $.__views.__alloyId8 = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        right: 15,
        title: "Edit",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    openMenuGroup ? $.__views.__alloyId8.addEventListener("click", openMenuGroup) : __defers["$.__views.__alloyId8!click!openMenuGroup"] = true;
    $.__views.__alloyId9 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        id: "__alloyId9"
    });
    $.__views.__alloyId6.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createView({
        backgroundColor: "#FFFFFF",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId10"
    });
    $.__views.__alloyId6.add($.__views.__alloyId10);
    $.__views.tableviewMenu = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.PLAIN,
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "tableviewMenu"
    });
    $.__views.__alloyId10.add($.__views.tableviewMenu);
    $.__views.tab = Ti.UI.createTab({
        title: "Menus",
        icon: "img/menu.png",
        activeIcon: "img/menu-fill.png",
        window: $.__views.win,
        id: "tab"
    });
    $.__views.tab && $.addTopLevelView($.__views.tab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var lib_menu = require("lib_menu");
    var parentWin = $.tab, aMenuList = (arguments[0] || {}, []), aMenu = [], oMenu = {};
    var menuListRefreshControl = Ti.UI.createRefreshControl({
        tintColor: "#FC3D39"
    });
    $.tableviewMenuList.refreshControl = menuListRefreshControl;
    menuListRefreshControl.addEventListener("refreshstart", function() {
        GetMenuList();
        menuListRefreshControl.endRefreshing();
    });
    var menuRefreshControl = Ti.UI.createRefreshControl({
        tintColor: "#FC3D39"
    });
    $.tableviewMenu.refreshControl = menuRefreshControl;
    menuRefreshControl.addEventListener("refreshstart", function() {
        GetReadOnlyMenu();
        menuRefreshControl.endRefreshing();
    });
    $.tableviewMenuList.addEventListener("click", function(e) {
        Ti.API.info("e.row");
        Ti.API.info(e.detail);
        oMenu = e.row.data || {};
        GetReadOnlyMenu();
    });
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("menus.initcontroller", initController);
        Ti.App.removeEventListener("menus.getmenus_success", getmenus_success);
        Ti.App.removeEventListener("menus.getmenus_error", getmenus_error);
        Ti.App.removeEventListener("menus.getreadonlymenu_success", getreadonlymenu_success);
        Ti.App.removeEventListener("menus.getreadonlymenu_error", getreadonlymenu_error);
        Ti.App.removeEventListener("menus.reordermenu_success", reordermenu_success);
        Ti.App.removeEventListener("menus.reordermenu_error", reordermenu_error);
        Ti.App.removeEventListener("menus.getmenulist", GetMenuList);
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("menus.initcontroller", initController);
        Ti.App.addEventListener("menus.getmenus_success", getmenus_success);
        Ti.App.addEventListener("menus.getmenus_error", getmenus_error);
        Ti.App.addEventListener("menus.getreadonlymenu_success", getreadonlymenu_success);
        Ti.App.addEventListener("menus.getreadonlymenu_error", getreadonlymenu_error);
        Ti.App.addEventListener("menus.reordermenu_success", reordermenu_success);
        Ti.App.addEventListener("menus.reordermenu_error", reordermenu_error);
        Ti.App.addEventListener("menus.getmenulist", GetMenuList);
        initController();
    });
    __defers["$.__views.buttonEditMenu!click!setMenusMoveable"] && $.__views.buttonEditMenu.addEventListener("click", setMenusMoveable);
    __defers["$.__views.__alloyId2!click!addMenu"] && $.__views.__alloyId2.addEventListener("click", addMenu);
    __defers["$.__views.buttonMenuLabel!click!editMenu"] && $.__views.buttonMenuLabel.addEventListener("click", editMenu);
    __defers["$.__views.__alloyId8!click!openMenuGroup"] && $.__views.__alloyId8.addEventListener("click", openMenuGroup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;