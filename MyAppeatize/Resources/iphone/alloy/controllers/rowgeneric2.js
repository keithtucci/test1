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
    this.__controllerPath = "rowgeneric2";
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
    $.__views.viewRowMain = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "absolute",
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        id: "viewRowMain"
    });
    $.__views.row.add($.__views.viewRowMain);
    $.__views.viewName = Ti.UI.createView({
        right: 60,
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "viewName"
    });
    $.__views.viewRowMain.add($.__views.viewName);
    $.__views.labelName = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 18
        },
        left: 0,
        right: 60,
        id: "labelName"
    });
    $.__views.viewName.add($.__views.labelName);
    $.__views.labelDescr = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: 0,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 14
        },
        left: 0,
        right: 60,
        id: "labelDescr"
    });
    $.__views.viewName.add($.__views.labelDescr);
    $.__views.viewPrice = Ti.UI.createView({
        top: 0,
        right: 0,
        layout: "vertical",
        width: 60,
        height: Ti.UI.SIZE,
        id: "viewPrice"
    });
    $.__views.viewRowMain.add($.__views.viewPrice);
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
    $.__views.viewPrice.add($.__views.labelPrice);
    $.__views.labelPriceText = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        id: "labelPriceText"
    });
    $.__views.viewPrice.add($.__views.labelPriceText);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, RowData = args.oData;
    Ti.API.info(args);
    "" != RowData.Name && ($.labelName.text = RowData.Name);
    if ("" != RowData.Descr) {
        $.labelDescr.height = Ti.UI.SIZE;
        $.labelDescr.text = RowData.Descr;
    }
    "" != RowData.Price && ($.labelPrice.text = RowData.DisplayPrice);
    "" != RowData.PriceText && ($.labelPriceText.text = RowData.PriceText);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;