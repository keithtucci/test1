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
    this.__controllerPath = "rowhome";
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
        height: 180,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.viewRowHeader = Ti.UI.createView({
        top: 0,
        width: Ti.UI.FILL,
        height: 40,
        layout: "absolute",
        backgroundColor: "#F7F7F7",
        id: "viewRowHeader"
    });
    $.__views.row.add($.__views.viewRowHeader);
    $.__views.labelRowHeader = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        id: "labelRowHeader"
    });
    $.__views.viewRowHeader.add($.__views.labelRowHeader);
    $.__views.__alloyId92 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        bottom: 0,
        id: "__alloyId92"
    });
    $.__views.viewRowHeader.add($.__views.__alloyId92);
    $.__views.viewHRow1 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "horizontal",
        top: 40,
        id: "viewHRow1"
    });
    $.__views.row.add($.__views.viewHRow1);
    $.__views.viewPod1 = Ti.UI.createView({
        width: "50%",
        height: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        layout: "absolute",
        id: "viewPod1"
    });
    $.__views.viewHRow1.add($.__views.viewPod1);
    $.__views.__alloyId93 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId93"
    });
    $.__views.viewPod1.add($.__views.__alloyId93);
    $.__views.labelVal1 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 80
        },
        id: "labelVal1"
    });
    $.__views.__alloyId93.add($.__views.labelVal1);
    $.__views.labelProp1 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#AAAAAA",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        top: 0,
        id: "labelProp1"
    });
    $.__views.__alloyId93.add($.__views.labelProp1);
    $.__views.viewVLine1 = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        right: 0,
        id: "viewVLine1"
    });
    $.__views.viewPod1.add($.__views.viewVLine1);
    $.__views.viewPod2 = Ti.UI.createView({
        width: "50%",
        height: Ti.UI.FILL,
        backgroundColor: "#FFFFFF",
        layout: "absolute",
        id: "viewPod2"
    });
    $.__views.viewHRow1.add($.__views.viewPod2);
    $.__views.__alloyId94 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId94"
    });
    $.__views.viewPod2.add($.__views.__alloyId94);
    $.__views.labelVal2 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 80
        },
        id: "labelVal2"
    });
    $.__views.__alloyId94.add($.__views.labelVal2);
    $.__views.labelProp2 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#AAAAAA",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        top: 0,
        id: "labelProp2"
    });
    $.__views.__alloyId94.add($.__views.labelProp2);
    $.__views.__alloyId95 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        bottom: 0,
        id: "__alloyId95"
    });
    $.__views.row.add($.__views.__alloyId95);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, RowData = args.oData;
    Ti.API.info(args);
    $.labelRowHeader.text = RowData.Header;
    $.labelProp1.text = RowData.Prop1;
    $.labelVal1.text = RowData.Val1;
    $.labelProp2.text = RowData.Prop2;
    $.labelVal2.text = RowData.Val2;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;