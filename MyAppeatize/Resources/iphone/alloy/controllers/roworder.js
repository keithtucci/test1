function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doOrderDetails() {
        Ti.App.fireEvent("orders.openorderdetail", {
            oData: RowData
        });
    }
    function doUpdateOrderStatus() {
        Ti.App.fireEvent("orders.updateorderstatus", {
            oData: RowData
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "roworder";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 120,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.viewRowMain = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "absolute",
        top: 0,
        bottom: "0",
        left: 0,
        right: 0,
        id: "viewRowMain"
    });
    $.__views.row.add($.__views.viewRowMain);
    $.__views.viewLabels = Ti.UI.createView({
        height: Ti.UI.FILL,
        layout: "vertical",
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        id: "viewLabels"
    });
    $.__views.viewRowMain.add($.__views.viewLabels);
    doOrderDetails ? $.__views.viewLabels.addEventListener("click", doOrderDetails) : __defers["$.__views.viewLabels!click!doOrderDetails"] = true;
    $.__views.labelDtEstComplete = Ti.UI.createLabel({
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
        id: "labelDtEstComplete"
    });
    $.__views.viewLabels.add($.__views.labelDtEstComplete);
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
    $.__views.viewLabels.add($.__views.labelOrderStatusName);
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
    $.__views.viewLabels.add($.__views.labelName);
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
    $.__views.viewLabels.add($.__views.labelDtCreated);
    $.__views.labelOrderText = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: 20,
        highlightedColor: "#fff",
        color: "#177EFB",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 14
        },
        wordWrap: false,
        ellipsize: true,
        id: "labelOrderText"
    });
    $.__views.viewLabels.add($.__views.labelOrderText);
    $.__views.viewAction = Ti.UI.createView({
        right: 0,
        width: 0,
        height: Ti.UI.FILL,
        id: "viewAction"
    });
    $.__views.viewRowMain.add($.__views.viewAction);
    doUpdateOrderStatus ? $.__views.viewAction.addEventListener("click", doUpdateOrderStatus) : __defers["$.__views.viewAction!click!doUpdateOrderStatus"] = true;
    $.__views.buttonAction = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        image: "/images/702-share.png",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
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
    $.__views.row.add($.__views.viewHLineBottom);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, RowData = args.oData;
    Ti.API.info(args);
    $.labelOrderStatusName.text = RowData.OrderStatusName;
    if ("" != RowData.OrderText) {
        var OrderText = RowData.OrderText.replace(/(\r\n|\n|\r)/gm, " ");
        $.labelOrderText.text = OrderText;
    }
    $.labelName.text = RowData.Name;
    $.labelDtCreated.text = moment(RowData.DtCreated).fromNow();
    $.labelDtEstComplete.text = RowData.OrderNumber + " - " + RowData.TimeText;
    if ("" != RowData.NextStatusName) {
        $.viewAction.backgroundColor = RowData.ColorHex;
        $.buttonAction.title = RowData.NextStatusName;
        $.viewAction.width = 120;
        $.viewLabels.right = 120;
    } else $.viewAction.enabled = false;
    __defers["$.__views.viewLabels!click!doOrderDetails"] && $.__views.viewLabels.addEventListener("click", doOrderDetails);
    __defers["$.__views.viewAction!click!doUpdateOrderStatus"] && $.__views.viewAction.addEventListener("click", doUpdateOrderStatus);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;