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
    this.__controllerPath = "rowcompany";
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
        height: 79,
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
        height: Ti.UI.FILL,
        layout: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        id: "viewRowMain"
    });
    $.__views.row.add($.__views.viewRowMain);
    $.__views.viewAction = Ti.UI.createView({
        layout: "absolute",
        top: 0,
        left: 0,
        width: 85,
        height: Ti.UI.FILL,
        id: "viewAction"
    });
    $.__views.viewRowMain.add($.__views.viewAction);
    $.__views.labelVal = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#FFFFFF",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 50,
            fontWeight: "bold"
        },
        id: "labelVal"
    });
    $.__views.viewAction.add($.__views.labelVal);
    $.__views.labelProp = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 20
        },
        left: 95,
        id: "labelProp"
    });
    $.__views.viewRowMain.add($.__views.labelProp);
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
    "" != RowData.OrderStatusName && ($.labelProp.text = RowData.Prop);
    "" != RowData.OrderNumber && ($.labelVal.text = RowData.Val);
    $.viewAction.backgroundColor = RowData.ColorHex;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;