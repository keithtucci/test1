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
    this.__controllerPath = "rowpropval";
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
        height: 60,
        backgroundColor: "transparent",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.viewRowMainContainer = Ti.UI.createView({
        borderColor: "#D8D9DC",
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        left: 10,
        right: 10,
        bottom: 0,
        top: 10,
        id: "viewRowMainContainer"
    });
    $.__views.row.add($.__views.viewRowMainContainer);
    $.__views.viewLeftImage = Ti.UI.createView({
        left: 0,
        width: 60,
        height: Ti.UI.FILL,
        id: "viewLeftImage"
    });
    $.__views.viewRowMainContainer.add($.__views.viewLeftImage);
    $.__views.imageviewIcon = Ti.UI.createImageView({
        id: "imageviewIcon"
    });
    $.__views.viewLeftImage.add($.__views.imageviewIcon);
    $.__views.labelProp = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        left: 60,
        id: "labelProp"
    });
    $.__views.viewRowMainContainer.add($.__views.labelProp);
    $.__views.imageviewRightArrow = Ti.UI.createImageView({
        right: 5,
        image: "/images/right-arrow-row.png",
        visible: false,
        touchEnabled: false,
        id: "imageviewRightArrow"
    });
    $.__views.viewRowMainContainer.add($.__views.imageviewRightArrow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.labelProp.text = args.oData.Prop;
    if (1 == args.oData.HasChild) {
        $.imageviewRightArrow.visible = true;
        $.labelProp.right = 40;
    }
    "" != args.oData.Icon && ($.imageviewIcon.image = "/images/" + args.oData.Icon);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;