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
    function doDelete() {
        var Name = "", Descr = "", Price = 0, PriceText = "", IsActive = false;
        Name = oEditData.Name;
        Descr = oEditData.Descr;
        if ("dish" == MenuTextTypeCode) {
            Price = oEditData.Price;
            PriceText = oEditData.PriceText;
        }
        ModifyMenuItem(Name, Descr, Price, PriceText, IsActive);
    }
    function doValidate() {
        var IsValid = true;
        if (IsValid && 0 == $.textfieldName.value.length) {
            IsValid = false;
            $.alertDialog.message = "Oops, Name is required to proceed.";
            $.alertDialog.show();
        }
        if (IsValid && $.textfieldPrice.value.length > 0 && !($.textfieldPrice.value >= 0) && "dish" == MenuTextTypeCode) {
            IsValid = false;
            $.alertDialog.message = "Oops, Price must be a valid number";
            $.alertDialog.show();
        }
        if (IsValid) {
            var Name = "", Descr = "", Price = 0, PriceText = "", IsActive = true;
            Name = $.textfieldName.value;
            Descr = $.textareaDescr.value;
            if ("dish" == MenuTextTypeCode) {
                Price = $.textfieldPrice.value;
                PriceText = $.textfieldPriceText.value;
            }
            ModifyMenuItem(Name, Descr, Price, PriceText, IsActive);
        }
    }
    function ModifyMenuItem(Name, Descr, Price, PriceText, IsActive) {
        var oArgs = {
            MenuTextTypeCode: MenuTextTypeCode,
            MenuId: MenuId,
            ParentMenuTextId: ParentMenuTextId,
            MenuTextId: MenuTextId,
            Name: Name,
            Descr: Descr,
            Price: Price,
            PriceText: PriceText,
            IsActive: IsActive,
            Callback: "addgeneric1.modifymenuitem_success",
            ErrorCallback: "addgeneric1.modifymenuitem_error"
        };
        lib_menu.ModifyMenuItem(oArgs);
    }
    function openDialogDelete() {
        $.dialogDelete.show();
    }
    function modifymenuitem_success(e) {
        Ti.API.info(e);
        Ti.App.fireEvent(Callback);
        closeWin();
    }
    function modifymenuitem_error(e) {
        Ti.API.info(e);
    }
    function setData() {
        Ti.API.info("setData");
        Ti.API.info(oEditData);
        $.textfieldName.value = oEditData.Name;
        $.textareaDescr.value = oEditData.Descr;
        if ("dish" == MenuTextTypeCode) {
            $.tableview2.height = 156;
            $.textfieldPrice.value = oEditData.Price;
            $.textfieldPriceText.value = oEditData.PriceText;
        }
    }
    function doCleanNumeric(e) {
        e.source.value = e.source.value.replace(/[^0-9.]+/, "");
    }
    function initController() {
        Ti.API.info("initController");
        setData();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "addgeneric1";
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
    $.__views.buttonDone = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
        title: "Done",
        id: "buttonDone"
    });
    doValidate ? $.__views.buttonDone.addEventListener("click", doValidate) : __defers["$.__views.buttonDone!click!doValidate"] = true;
    $.__views.win2.rightNavButton = $.__views.buttonDone;
    $.__views.alertDialog = Ti.UI.createAlertDialog({
        color: "#030303",
        tintColor: "#D82D16",
        id: "alertDialog",
        title: ""
    });
    $.__views.dialogDelete = Ti.UI.createOptionDialog({
        title: "Are you sure you wish to delete this item...?",
        destructive: 0,
        options: [ "Yes, delete item", "No, do nothing" ],
        id: "dialogDelete"
    });
    $.__views.viewData = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        visible: "true",
        id: "viewData"
    });
    $.__views.win2.add($.__views.viewData);
    var __alloyId29 = [];
    $.__views.tableviewrowName = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 60,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "tableviewrowName"
    });
    __alloyId29.push($.__views.tableviewrowName);
    $.__views.labelName = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: 22,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 18
        },
        wordWrap: false,
        ellipsize: true,
        text: "Name",
        id: "labelName"
    });
    $.__views.tableviewrowName.add($.__views.labelName);
    $.__views.viewVertLineRow = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: 1,
            height: Ti.UI.FILL,
            backgroundColor: "#d1d1d1"
        });
        Alloy.isTablet && _.extend(o, {
            left: 135
        });
        _.extend(o, {
            id: "viewVertLineRow"
        });
        return o;
    }());
    $.__views.tableviewrowName.add($.__views.viewVertLineRow);
    $.__views.textfieldName = Ti.UI.createTextField({
        height: 40,
        color: "#2E2E2D",
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#fff",
        borderWidth: 1,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        font: {
            fontSize: 18
        },
        paddingLeft: 5,
        left: 145,
        id: "textfieldName"
    });
    $.__views.tableviewrowName.add($.__views.textfieldName);
    $.__views.tableviewrowDescr = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 120,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "tableviewrowDescr"
    });
    __alloyId29.push($.__views.tableviewrowDescr);
    $.__views.labelDescr = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: 22,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 18
        },
        wordWrap: false,
        ellipsize: true,
        text: "Description",
        top: 20,
        id: "labelDescr"
    });
    $.__views.tableviewrowDescr.add($.__views.labelDescr);
    $.__views.viewVertLineRow = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: 1,
            height: Ti.UI.FILL,
            backgroundColor: "#d1d1d1"
        });
        Alloy.isTablet && _.extend(o, {
            left: 135
        });
        _.extend(o, {
            id: "viewVertLineRow"
        });
        return o;
    }());
    $.__views.tableviewrowDescr.add($.__views.viewVertLineRow);
    $.__views.textareaDescr = Ti.UI.createTextArea({
        scrollable: true,
        height: Ti.UI.FILL,
        color: "#2E2E2D",
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
            fontSize: 18
        },
        left: 145,
        top: 10,
        bottom: 10,
        suppressReturn: false,
        id: "textareaDescr"
    });
    $.__views.tableviewrowDescr.add($.__views.textareaDescr);
    $.__views.tableview1 = Ti.UI.createTableView({
        height: 216,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        top: "-36",
        scrollable: false,
        data: __alloyId29,
        id: "tableview1"
    });
    $.__views.viewData.add($.__views.tableview1);
    var __alloyId30 = [];
    $.__views.tableviewrowPrice = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 60,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "tableviewrowPrice"
    });
    __alloyId30.push($.__views.tableviewrowPrice);
    $.__views.labelPrice = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: 22,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 18
        },
        wordWrap: false,
        ellipsize: true,
        text: "Price",
        id: "labelPrice"
    });
    $.__views.tableviewrowPrice.add($.__views.labelPrice);
    $.__views.viewVertLineRow = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: 1,
            height: Ti.UI.FILL,
            backgroundColor: "#d1d1d1"
        });
        Alloy.isTablet && _.extend(o, {
            left: 135
        });
        _.extend(o, {
            id: "viewVertLineRow"
        });
        return o;
    }());
    $.__views.tableviewrowPrice.add($.__views.viewVertLineRow);
    $.__views.textfieldPrice = Ti.UI.createTextField({
        height: 40,
        color: "#2E2E2D",
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#fff",
        borderWidth: 1,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        font: {
            fontSize: 18
        },
        paddingLeft: 5,
        left: 145,
        id: "textfieldPrice"
    });
    $.__views.tableviewrowPrice.add($.__views.textfieldPrice);
    doCleanNumeric ? $.__views.textfieldPrice.addEventListener("change", doCleanNumeric) : __defers["$.__views.textfieldPrice!change!doCleanNumeric"] = true;
    $.__views.tableviewrowPriceText = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 60,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "tableviewrowPriceText"
    });
    __alloyId30.push($.__views.tableviewrowPriceText);
    $.__views.labelPriceText = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: 22,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 18
        },
        wordWrap: false,
        ellipsize: true,
        text: "Price Text",
        id: "labelPriceText"
    });
    $.__views.tableviewrowPriceText.add($.__views.labelPriceText);
    $.__views.viewVertLineRow = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: 1,
            height: Ti.UI.FILL,
            backgroundColor: "#d1d1d1"
        });
        Alloy.isTablet && _.extend(o, {
            left: 135
        });
        _.extend(o, {
            id: "viewVertLineRow"
        });
        return o;
    }());
    $.__views.tableviewrowPriceText.add($.__views.viewVertLineRow);
    $.__views.textfieldPriceText = Ti.UI.createTextField({
        height: 40,
        color: "#2E2E2D",
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#fff",
        borderWidth: 1,
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        font: {
            fontSize: 18
        },
        paddingLeft: 5,
        left: 145,
        id: "textfieldPriceText"
    });
    $.__views.tableviewrowPriceText.add($.__views.textfieldPriceText);
    $.__views.tableview2 = Ti.UI.createTableView({
        height: 0,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        scrollable: false,
        data: __alloyId30,
        id: "tableview2"
    });
    $.__views.viewData.add($.__views.tableview2);
    var __alloyId33 = [];
    $.__views.__alloyId34 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId33.push($.__views.__alloyId34);
    $.__views.buttonDelete = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        title: "Delete",
        id: "buttonDelete"
    });
    __alloyId33.push($.__views.buttonDelete);
    openDialogDelete ? $.__views.buttonDelete.addEventListener("click", openDialogDelete) : __defers["$.__views.buttonDelete!click!openDialogDelete"] = true;
    $.__views.__alloyId35 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId33.push($.__views.__alloyId35);
    $.__views.__alloyId31 = Ti.UI.iOS.createToolbar({
        bottom: 0,
        borderTop: false,
        borderBottom: false,
        borderColor: "#D0D1D5",
        barColor: "#F7F7F7",
        tintColor: "#666666",
        items: __alloyId33,
        id: "__alloyId31"
    });
    $.__views.win2.add($.__views.__alloyId31);
    $.__views.win = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.win2,
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var lib_menu = require("lib_menu");
    var args = arguments[0] || {}, Callback = args.Callback, MenuTextTypeCode = args.MenuTextTypeCode || "", MenuId = args.MenuId || 0, ParentMenuTextId = args.ParentMenuTextId || 0, MenuTextId = args.MenuTextId || 0, oEditData = args.oEditData || {};
    Ti.API.info(args);
    $.win2.title = args.NavBarTitle;
    $.dialogDelete.addEventListener("click", function(e) {
        0 == e.index && doDelete();
    });
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("addgeneric1.closewin", closeWin);
        Ti.App.removeEventListener("addgeneric1.initcontroller", initController);
        Ti.App.removeEventListener("addgeneric1.modifymenuitem_success", modifymenuitem_success);
        Ti.App.removeEventListener("addgeneric1.modifymenuitem_error", modifymenuitem_error);
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("addgeneric1.closewin", closeWin);
        Ti.App.addEventListener("addgeneric1.initcontroller", initController);
        Ti.App.addEventListener("addgeneric1.modifymenuitem_success", modifymenuitem_success);
        Ti.App.addEventListener("addgeneric1.modifymenuitem_error", modifymenuitem_error);
        initController();
    });
    __defers["$.__views.buttonDown!click!closeWin"] && $.__views.buttonDown.addEventListener("click", closeWin);
    __defers["$.__views.buttonDone!click!doValidate"] && $.__views.buttonDone.addEventListener("click", doValidate);
    __defers["$.__views.textfieldPrice!change!doCleanNumeric"] && $.__views.textfieldPrice.addEventListener("change", doCleanNumeric);
    __defers["$.__views.buttonDelete!click!openDialogDelete"] && $.__views.buttonDelete.addEventListener("click", openDialogDelete);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;