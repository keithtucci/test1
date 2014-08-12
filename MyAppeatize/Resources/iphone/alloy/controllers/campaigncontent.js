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
        Ti.App.fireEvent("addcampaign.setcontent", {
            CampaignHeader: $.textareaHeader.value,
            CampaignText: $.textareaMessage.value
        });
        $.win.close();
    }
    function setData() {}
    function hintHeaderText() {
        if (0 == $.textareaHeader.value.length) {
            $.textareaHeader.setColor("##C7C7CD");
            $.textareaHeader.setValue(hintHeader);
        }
    }
    function hintMessageText() {
        if (0 == $.textareaMessage.value.length) {
            $.textareaMessage.setColor("##C7C7CD");
            $.textareaMessage.setValue(hintMessage);
        }
    }
    function textareaHeader_return() {
        $.textareaMessage.focus();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "campaigncontent";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#FFFFFF",
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
        layout: "absolute",
        visible: true,
        id: "viewData"
    });
    $.__views.win.add($.__views.viewData);
    var __alloyId37 = [];
    $.__views.tableviewrowHeader = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 95,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "tableviewrowHeader"
    });
    __alloyId37.push($.__views.tableviewrowHeader);
    $.__views.textareaHeader = Ti.UI.createTextArea({
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
            fontSize: 18
        },
        top: 10,
        left: 10,
        bottom: 10,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        suppressReturn: true,
        autocorrect: true,
        maxLength: 100,
        id: "textareaHeader"
    });
    $.__views.tableviewrowHeader.add($.__views.textareaHeader);
    textareaHeader_return ? $.__views.textareaHeader.addEventListener("return", textareaHeader_return) : __defers["$.__views.textareaHeader!return!textareaHeader_return"] = true;
    $.__views.__alloyId38 = Ti.UI.createView({
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        bottom: 0,
        left: 15,
        id: "__alloyId38"
    });
    $.__views.tableviewrowHeader.add($.__views.__alloyId38);
    $.__views.tableviewrowMessage = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 200,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "tableviewrowMessage"
    });
    __alloyId37.push($.__views.tableviewrowMessage);
    $.__views.textareaMessage = Ti.UI.createTextArea({
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
            fontSize: 18
        },
        top: 10,
        left: 10,
        bottom: 10,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
        returnKeyType: Titanium.UI.RETURNKEY_DEFAULT,
        suppressReturn: false,
        autocorrect: true,
        maxLength: 500,
        id: "textareaMessage"
    });
    $.__views.tableviewrowMessage.add($.__views.textareaMessage);
    $.__views.tableview = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.PLAIN,
        scrollable: false,
        separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
        data: __alloyId37,
        id: "tableview"
    });
    $.__views.viewData.add($.__views.tableview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, oData = args.oData || {};
    var hintHeader = (args.Data, "Alert text"), hintMessage = "Message text";
    $.win.title = args.NavBarTitle;
    $.textareaHeader.addEventListener("blur", function() {
        hintHeaderText();
    });
    $.textareaHeader.addEventListener("focus", function() {
        if ($.textareaHeader.value == hintHeader) {
            $.textareaHeader.setValue("");
            $.textareaHeader.setColor("#177EFB");
        }
    });
    $.textareaMessage.addEventListener("blur", function() {
        hintMessageText();
    });
    $.textareaMessage.addEventListener("focus", function() {
        if ($.textareaMessage.value == hintMessage) {
            $.textareaMessage.setValue("");
            $.textareaMessage.setColor("#177EFB");
        }
    });
    $.win.addEventListener("focus", function() {
        hintHeaderText();
        hintMessageText();
        Ti.API.info(oData);
        if (null != oData.CampaignHeader && oData.CampaignHeader.length > 0) {
            $.textareaHeader.setValue("");
            $.textareaHeader.setColor("#177EFB");
            $.textareaHeader.value = oData.CampaignHeader;
        }
        if (null != oData.CampaignText && oData.CampaignText.length > 0) {
            $.textareaMessage.setValue("");
            $.textareaMessage.setColor("#177EFB");
            $.textareaMessage.value = oData.CampaignText;
        }
    });
    $.win.addEventListener("close", function() {
        $.destroy();
    });
    $.win.addEventListener("open", function() {});
    setData();
    __defers["$.__views.buttonBack!click!closeWin"] && $.__views.buttonBack.addEventListener("click", closeWin);
    __defers["$.__views.textareaHeader!return!textareaHeader_return"] && $.__views.textareaHeader.addEventListener("return", textareaHeader_return);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;