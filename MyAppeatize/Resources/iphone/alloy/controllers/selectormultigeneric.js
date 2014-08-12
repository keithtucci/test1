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
        $.win.close({
            animated: true
        });
    }
    function loadData() {
        var data = [];
        var i = 0;
        _.each(qData, function(oData) {
            var args = {
                oData: oData
            };
            var row = Alloy.createController("selectorgenericrow", args).getView();
            row.data = oData;
            oData.HasDescr = false;
            row.hasCheck = oData.IsSelected;
            data.push(row);
            i++;
        });
        $.tableview.setData(data);
    }
    function doSave() {
        Ti.App.fireEvent(Callback, {
            qData: qData
        });
        closeWin();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "selectormultigeneric";
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
    doSave ? $.__views.buttonBack.addEventListener("click", doSave) : __defers["$.__views.buttonBack!click!doSave"] = true;
    $.__views.win.leftNavButton = $.__views.buttonBack;
    $.__views.viewData = Ti.UI.createView({
        id: "viewData"
    });
    $.__views.win.add($.__views.viewData);
    $.__views.tableview = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        id: "tableview"
    });
    $.__views.viewData.add($.__views.tableview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var qData = [], Callback = args.Callback;
    args.Id;
    qData = args.qData;
    $.win.title = args.NavBarTitle;
    $.win.addEventListener("focus", function() {
        loadData();
    });
    $.tableview.addEventListener("click", function(e) {
        var HasSelection = false;
        _.each(qData, function(oData) {
            if (oData.Id == e.row.data.Id) if (1 == oData.IsSelected) oData.IsSelected = 0; else {
                oData.IsSelected = 1;
                HasSelection = true;
            }
        });
        loadData();
    });
    $.win.addEventListener("close", function() {
        qData = [];
        $.destroy();
    });
    __defers["$.__views.buttonBack!click!doSave"] && $.__views.buttonBack.addEventListener("click", doSave);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;