function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doCampaignDetails() {
        Ti.App.fireEvent("campaigns.openaddcampaign", {
            CampaignId: RowData.CampaignId
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "rowcampaign";
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
    $.__views.labelCampaignName = Ti.UI.createLabel({
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
        id: "labelCampaignName"
    });
    $.__views.viewLabels.add($.__views.labelCampaignName);
    $.__views.labelDtEffective = Ti.UI.createLabel({
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
        id: "labelDtEffective"
    });
    $.__views.viewLabels.add($.__views.labelDtEffective);
    $.__views.labelTimeSend = Ti.UI.createLabel({
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
        id: "labelTimeSend"
    });
    $.__views.viewLabels.add($.__views.labelTimeSend);
    $.__views.labelRepeatText = Ti.UI.createLabel({
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
        id: "labelRepeatText"
    });
    $.__views.viewLabels.add($.__views.labelRepeatText);
    $.__views.labelCampaignHeader = Ti.UI.createLabel({
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
        id: "labelCampaignHeader"
    });
    $.__views.viewLabels.add($.__views.labelCampaignHeader);
    $.__views.viewAction = Ti.UI.createView({
        right: 0,
        width: 60,
        height: Ti.UI.FILL,
        tintColor: "#666666",
        id: "viewAction"
    });
    $.__views.viewRowMain.add($.__views.viewAction);
    $.__views.viewButtons = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "viewButtons"
    });
    $.__views.viewAction.add($.__views.viewButtons);
    $.__views.viewButton = Ti.UI.createView({
        backgroundColor: "#F7F7F7",
        height: "50%",
        width: Ti.UI.FILL,
        id: "viewButton"
    });
    $.__views.viewButtons.add($.__views.viewButton);
    doCampaignDetails ? $.__views.viewButton.addEventListener("click", doCampaignDetails) : __defers["$.__views.viewButton!click!doCampaignDetails"] = true;
    $.__views.buttonEdit = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        image: "/img/edit-2.png",
        id: "buttonEdit"
    });
    $.__views.viewButton.add($.__views.buttonEdit);
    $.__views.viewButton = Ti.UI.createView({
        backgroundColor: "#F7F7F7",
        height: "50%",
        width: Ti.UI.FILL,
        id: "viewButton"
    });
    $.__views.viewButtons.add($.__views.viewButton);
    $.__views.buttonAnalytics = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        image: "/img/pie-chart-2.png",
        id: "buttonAnalytics"
    });
    $.__views.viewButton.add($.__views.buttonAnalytics);
    $.__views.viewVLineLeft = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        left: 0,
        id: "viewVLineLeft"
    });
    $.__views.viewAction.add($.__views.viewVLineLeft);
    $.__views.viewHLineMiddle = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        id: "viewHLineMiddle"
    });
    $.__views.viewAction.add($.__views.viewHLineMiddle);
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
    var TimeSend = moment(RowData.TimeSend).format("hh:mm A");
    var DtEffective = moment(RowData.DtEffective).format("MM/DD/YYYY");
    $.labelCampaignName.text = RowData.CampaignName;
    $.labelDtEffective.text = "Starts on " + DtEffective;
    $.labelTimeSend.text = "Runs at " + TimeSend;
    $.labelRepeatText.text = "Repeats " + RowData.RepeatText;
    $.labelCampaignHeader.text = RowData.CampaignHeader;
    __defers["$.__views.viewButton!click!doCampaignDetails"] && $.__views.viewButton.addEventListener("click", doCampaignDetails);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;