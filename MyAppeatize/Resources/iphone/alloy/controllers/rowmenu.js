function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "rowmenu";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.viewRowMenuMain = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "absolute",
        top: 0,
        bottom: 0,
        left: 10,
        right: 10,
        id: "viewRowMenuMain"
    });
    $.__views.row.add($.__views.viewRowMenuMain);
    $.__views.labelMenuVal = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        left: 0,
        right: 70,
        id: "labelMenuVal"
    });
    $.__views.viewRowMenuMain.add($.__views.labelMenuVal);
    $.__views.labelPrice = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#40AB2B",
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        font: {
            fontSize: 16
        },
        right: 0,
        id: "labelPrice"
    });
    $.__views.viewRowMenuMain.add($.__views.labelPrice);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, RowData = args.oData;
    Ti.API.info(args);
    RowData.LeftMargin > 0 && ($.labelMenuVal.left = RowData.LeftMargin);
    RowData.TopMargin > 0 && ($.labelMenuVal.top = RowData.TopMargin);
    if (RowData.FontSize > 0) {
        $.labelMenuVal.font = {
            fontSize: RowData.FontSize + 4
        };
        $.labelPrice.font = {
            fontSize: RowData.FontSize + 4
        };
    }
    if ("left" == RowData.Align) $.labelMenuVal.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT; else if ("right" == RowData.Align) $.labelMenuVal.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT; else if ("center" == RowData.Align) {
        $.labelMenuVal.textAlign = Ti.UI.TEXT_ALIGNMENT_CENTER;
        $.labelMenuVal.right = 0;
    }
    RowData.IsItalic && ($.labelMenuVal.font = {
        fontFamily: "Helvetica-Oblique"
    });
    RowData.IsBold && ($.labelMenuVal.font = {
        fontWeight: "bold",
        fontSize: RowData.FontSize + 4
    });
    RowData.IsGrey && ($.labelMenuVal.color = "#AAAAAA");
    "" != RowData.Price && ($.labelPrice.text = RowData.Price);
    "" != RowData.Val && ($.labelMenuVal.text = RowData.Val);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;