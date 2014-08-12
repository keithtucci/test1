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
    function validateSave() {
        var aSaveDay = [], CampaignName = "", DayIdList = "", TimeSend = $.pickerCampaignTime.value, DtEffective = "", IsActive = !$.switchPause.value;
        _.each(aDay, function(oData) {
            oData.IsSelected && aSaveDay.push(oData.Id);
        });
        DayIdList = aSaveDay.toString();
        TimeSend = moment(TimeSend).format("HH:mm");
        DtEffective = moment(StartDate).format("YYYYMMDD");
        CampaignName = $.textfieldCampaignName.value;
        Ti.API.info(DayIdList);
        Ti.API.info(TimeSend);
        Ti.API.info(DtEffective);
        Ti.API.info(IsActive);
        Ti.API.info(CampaignHeader);
        Ti.API.info(CampaignText);
        Ti.API.info(RepeatText);
        Ti.API.info(CampaignName);
        var IsValid = true;
        if (IsValid && 0 == CampaignName.length) {
            IsValid = false;
            $.alertDialog.message = "Oops, a campaign name is required to proceed.";
            $.alertDialog.show();
        }
        if (IsValid && 0 == CampaignHeader.length) {
            IsValid = false;
            $.alertDialog.message = "Oops, alert text is required to proceed.";
            $.alertDialog.show();
        }
        if (IsValid && 0 == CampaignText.length) {
            IsValid = false;
            $.alertDialog.message = "Oops, message text is required to proceed.";
            $.alertDialog.show();
        }
        IsValid && CommitCampaign(CampaignName, DayIdList, TimeSend, DtEffective, IsActive);
    }
    function CommitCampaign(CampaignName, DayIdList, TimeSend, DtEffective, IsActive) {
        var oArgs = {
            CampaignId: CampaignId,
            CampaignName: CampaignName,
            RepeatText: RepeatText,
            DayIdList: DayIdList,
            TimeSend: TimeSend,
            DtEffective: DtEffective,
            IsActive: IsActive,
            CampaignHeader: CampaignHeader,
            CampaignText: CampaignText,
            Callback: "addcampaign.commitcampaign_success",
            ErrorCallback: "addcampaign.commitcampaign_error"
        };
        lib_campaign.CommitCampaign(oArgs);
    }
    function GetCampaignDetail() {
        var oArgs = {
            CampaignId: CampaignId,
            Callback: "addcampaign.getcampaigndetail_success",
            ErrorCallback: "addcampaign.getcampaigndetail_error"
        };
        lib_campaign.GetCampaignDetail(oArgs);
    }
    function openRepeat() {
        Ti.API.info("openRepeat");
        openSelectorMulti("Repeat", "addcampaign.setrepeat", aDay, 0);
    }
    function openContent() {
        Ti.API.info("openCampaignContent");
        var oData = {
            CampaignHeader: CampaignHeader,
            CampaignText: CampaignText
        };
        openNext("campaigncontent", "Content", "addcampaign.setcontent", oData);
    }
    function openSelectorMulti(NavBarTitle, Callback, qData) {
        Ti.API.info("openSelectorMulti");
        var SelectedId = 0;
        var NextController = Alloy.createController("selectormultigeneric", {
            qData: qData,
            NavBarTitle: NavBarTitle,
            Callback: Callback,
            SelectedId: SelectedId,
            Id: 0,
            parentWin: $.win
        });
        $.win.openWindow(NextController.getView());
    }
    function openNext(Controller, NavBarTitle, Callback, oData) {
        var NextController = Alloy.createController(Controller, {
            oData: oData,
            NavBarTitle: NavBarTitle,
            Callback: Callback
        });
        $.win.openWindow(NextController.getView());
    }
    function loadData() {
        if (null != oDetail) {
            StartDate = oDetail.DtEffective;
            $.labelStartDateVal.text = moment(StartDate).format("MMMM Do YYYY");
            Ti.API.info(new Date());
            $.pickerCampaignTime.value = new Date(moment(oDetail.TimeSend).format("MM/DD/YYYY hh:mm a"));
            $.textfieldCampaignName.value = oDetail.CampaignName;
            CampaignText = oDetail.CampaignText;
            CampaignHeader = oDetail.CampaignHeader;
            DtEffective = oDetail.DtEffective;
            $.labelContentVal.text = null != CampaignHeader && CampaignHeader.length > 0 ? CampaignHeader : "None";
        } else $.labelStartDateVal.text = moment(StartDate).format("MMMM Do YYYY");
        setRepeat();
    }
    function getcampaigndetail_success(e) {
        Ti.API.info(e);
        null != e.oData.oDetail && (oDetail = e.oData.oDetail);
        aDay = e.oData.aDay;
        loadData();
    }
    function getcampaigndetail_error(e) {
        Ti.API.info(e);
    }
    function commitcampaign_success(e) {
        Ti.API.info(e);
        Ti.App.fireEvent("campaigns.dorefresh");
        closeWin();
    }
    function commitcampaign_error(e) {
        Ti.API.info(e);
    }
    function setContent(e) {
        Ti.API.info("setContent");
        Ti.API.info(e);
        CampaignHeader = e.CampaignHeader;
        CampaignText = e.CampaignText;
        $.labelContentVal.text = null != CampaignHeader && CampaignHeader.length > 0 ? CampaignHeader : "None";
    }
    function setRepeat() {
        Ti.API.info("setRepeat");
        RepeatText = "", i = 0, WeekendCount = 0, WeekdayCount = 0;
        _.each(aDay, function(oData) {
            if (oData.IsSelected) {
                RepeatText += " " + oData.Descr;
                i++;
                oData.IsWeekend ? WeekendCount++ : WeekdayCount++;
            }
        });
        0 == RepeatText.length ? RepeatText = "Never" : 7 == WeekendCount + WeekdayCount ? RepeatText = "Everyday" : 2 == WeekendCount && 0 == WeekdayCount ? RepeatText = "Weekends" : 5 == WeekdayCount && 0 == WeekendCount && (RepeatText = "Weekdays");
        $.labelRepeatVal.text = RepeatText;
    }
    function initController() {
        GetCampaignDetail();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "addcampaign";
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
        tabBarHidden: true,
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
    $.__views.dialogActions = Ti.UI.createOptionDialog({
        id: "dialogActions"
    });
    $.__views.alertDialog = Ti.UI.createAlertDialog({
        color: "#030303",
        tintColor: "#D82D16",
        id: "alertDialog",
        title: ""
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
    $.__views.win.leftNavButton = $.__views.buttonDown;
    $.__views.buttonSave = Ti.UI.createButton({
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        font: {
            fontSize: 16
        },
        style: Titanium.UI.iPhone.SystemButtonStyle.BAR,
        title: "Save",
        id: "buttonSave"
    });
    validateSave ? $.__views.buttonSave.addEventListener("click", validateSave) : __defers["$.__views.buttonSave!click!validateSave"] = true;
    $.__views.win.rightNavButton = $.__views.buttonSave;
    $.__views.viewData = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "absolute",
        visible: true,
        id: "viewData"
    });
    $.__views.win.add($.__views.viewData);
    var __alloyId19 = [];
    $.__views.tableviewrowPickerTime = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "tableviewrowPickerTime"
    });
    __alloyId19.push($.__views.tableviewrowPickerTime);
    $.__views.viewPickerTime = Ti.UI.createView({
        top: 0,
        height: 162,
        layout: "absolute",
        id: "viewPickerTime"
    });
    $.__views.tableviewrowPickerTime.add($.__views.viewPickerTime);
    $.__views.pickerCampaignTime = Ti.UI.createPicker({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        borderRadius: 0,
        borderColor: "#fff",
        borderWidth: 0,
        selectionIndicator: "true",
        useSpinner: "true",
        type: Titanium.UI.PICKER_TYPE_TIME,
        format24: false,
        calendarViewShown: false,
        id: "pickerCampaignTime"
    });
    $.__views.viewPickerTime.add($.__views.pickerCampaignTime);
    $.__views.viewHLinePickerTime = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "1px",
        borderColor: "#D0D1D5",
        borderWidth: "1px",
        bottom: 0,
        id: "viewHLinePickerTime"
    });
    $.__views.viewPickerTime.add($.__views.viewHLinePickerTime);
    $.__views.__alloyId20 = Ti.UI.createTableViewSection({
        id: "__alloyId20"
    });
    __alloyId19.push($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 50,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    $.__views.labelCampaignName = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        left: 15,
        text: "Name",
        id: "labelCampaignName"
    });
    $.__views.__alloyId21.add($.__views.labelCampaignName);
    $.__views.textfieldCampaignName = Ti.UI.createTextField({
        height: 40,
        color: "#000000",
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
        left: 80,
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        right: 10,
        hintText: "Required",
        maxLength: 20,
        id: "textfieldCampaignName"
    });
    $.__views.__alloyId21.add($.__views.textfieldCampaignName);
    $.__views.__alloyId22 = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 50,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "__alloyId22"
    });
    $.__views.__alloyId20.add($.__views.__alloyId22);
    $.__views.labelStartDate = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        left: 15,
        text: "Start Date",
        id: "labelStartDate"
    });
    $.__views.__alloyId22.add($.__views.labelStartDate);
    $.__views.labelStartDateVal = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: 20,
        highlightedColor: "#fff",
        color: "#177EFB",
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        font: {
            fontSize: 16
        },
        right: 30,
        left: 80,
        wordWrap: false,
        id: "labelStartDateVal"
    });
    $.__views.__alloyId22.add($.__views.labelStartDateVal);
    $.__views.imageviewRightArrow = Ti.UI.createImageView({
        right: 5,
        image: "/images/right-arrow-row.png",
        visible: true,
        touchEnabled: false,
        id: "imageviewRightArrow"
    });
    $.__views.__alloyId22.add($.__views.imageviewRightArrow);
    $.__views.__alloyId23 = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 50,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "__alloyId23"
    });
    $.__views.__alloyId20.add($.__views.__alloyId23);
    openRepeat ? $.__views.__alloyId23.addEventListener("click", openRepeat) : __defers["$.__views.__alloyId23!click!openRepeat"] = true;
    $.__views.labelRepeat = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        left: 15,
        text: "Repeat",
        id: "labelRepeat"
    });
    $.__views.__alloyId23.add($.__views.labelRepeat);
    $.__views.labelRepeatVal = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: 20,
        highlightedColor: "#fff",
        color: "#177EFB",
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        font: {
            fontSize: 16
        },
        right: 30,
        left: 80,
        wordWrap: false,
        id: "labelRepeatVal"
    });
    $.__views.__alloyId23.add($.__views.labelRepeatVal);
    $.__views.imageviewRightArrow = Ti.UI.createImageView({
        right: 5,
        image: "/images/right-arrow-row.png",
        visible: true,
        touchEnabled: false,
        id: "imageviewRightArrow"
    });
    $.__views.__alloyId23.add($.__views.imageviewRightArrow);
    $.__views.__alloyId24 = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 50,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "__alloyId24"
    });
    $.__views.__alloyId20.add($.__views.__alloyId24);
    $.__views.labelPause = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        left: 15,
        text: "Pause",
        id: "labelPause"
    });
    $.__views.__alloyId24.add($.__views.labelPause);
    $.__views.switchPause = Ti.UI.createSwitch({
        value: false,
        right: 15,
        id: "switchPause"
    });
    $.__views.__alloyId24.add($.__views.switchPause);
    $.__views.__alloyId25 = Ti.UI.createTableViewSection({
        id: "__alloyId25"
    });
    __alloyId19.push($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createTableViewRow({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: 50,
        backgroundColor: "#FFFFFF",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        font: {
            fontSize: 18
        },
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    openContent ? $.__views.__alloyId26.addEventListener("click", openContent) : __defers["$.__views.__alloyId26!click!openContent"] = true;
    $.__views.labelContent = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#23323D",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        left: 15,
        text: "Content",
        id: "labelContent"
    });
    $.__views.__alloyId26.add($.__views.labelContent);
    $.__views.labelContentVal = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: 20,
        highlightedColor: "#fff",
        color: "#177EFB",
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        font: {
            fontSize: 16
        },
        right: 30,
        left: 80,
        wordWrap: false,
        text: "Required",
        id: "labelContentVal"
    });
    $.__views.__alloyId26.add($.__views.labelContentVal);
    $.__views.imageviewRightArrow = Ti.UI.createImageView({
        right: 5,
        image: "/images/right-arrow-row.png",
        visible: true,
        touchEnabled: false,
        id: "imageviewRightArrow"
    });
    $.__views.__alloyId26.add($.__views.imageviewRightArrow);
    $.__views.tableview = Ti.UI.createTableView({
        height: Ti.UI.FILL,
        backgroundColor: "transparent",
        allowsSelection: true,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        top: "-36",
        data: __alloyId19,
        id: "tableview"
    });
    $.__views.viewData.add($.__views.tableview);
    $.__views.viewLoading = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        layout: "absolute",
        visible: false,
        backgroundColor: "#AAAAAA",
        opacity: ".70",
        borderRadius: 0,
        id: "viewLoading"
    });
    $.__views.win.add($.__views.viewLoading);
    $.__views.viewLoadingContainer = Ti.UI.createView({
        layout: "absolute",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "viewLoadingContainer"
    });
    $.__views.viewLoading.add($.__views.viewLoadingContainer);
    $.__views.activityindicatorLoading = Ti.UI.createActivityIndicator({
        style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
        id: "activityindicatorLoading"
    });
    $.__views.viewLoadingContainer.add($.__views.activityindicatorLoading);
    $.__views.labelLoadingMessage = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        highlightedColor: "#fff",
        color: "#F7F7F7",
        textAlign: "center",
        font: {
            fontSize: 16
        },
        top: 10,
        id: "labelLoadingMessage"
    });
    $.__views.viewLoadingContainer.add($.__views.labelLoadingMessage);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, oDetail = (args.parentWin, {}), aDay = [], CampaignId = args.Id || 0, StartDate = new Date(), CampaignHeader = "", CampaignText = "", RepeatText = "";
    var moment = require("alloy/moment"), lib_campaign = require("lib_campaign");
    $.win.title = args.NavBarTitle;
    $.win.addEventListener("close", function() {
        Ti.App.removeEventListener("addcampaign.closewin", closeWin);
        Ti.App.removeEventListener("addcampaign.getcampaigndetail_success", getcampaigndetail_success);
        Ti.App.removeEventListener("addcampaign.getcampaigndetail_error", getcampaigndetail_error);
        Ti.App.removeEventListener("addcampaign.commitcampaign_success", commitcampaign_success);
        Ti.App.removeEventListener("addcampaign.commitcampaign_error", commitcampaign_error);
        Ti.App.removeEventListener("addcampaign.setrepeat", setRepeat);
        Ti.App.removeEventListener("addcampaign.setcontent", setContent);
        $.destroy();
    });
    $.win.addEventListener("open", function() {
        Ti.App.addEventListener("addcampaign.closewin", closeWin);
        Ti.App.addEventListener("addcampaign.getcampaigndetail_success", getcampaigndetail_success);
        Ti.App.addEventListener("addcampaign.getcampaigndetail_error", getcampaigndetail_error);
        Ti.App.addEventListener("addcampaign.commitcampaign_success", commitcampaign_success);
        Ti.App.addEventListener("addcampaign.commitcampaign_error", commitcampaign_error);
        Ti.App.addEventListener("addcampaign.setrepeat", setRepeat);
        Ti.App.addEventListener("addcampaign.setcontent", setContent);
        initController();
    });
    __defers["$.__views.buttonDown!click!closeWin"] && $.__views.buttonDown.addEventListener("click", closeWin);
    __defers["$.__views.buttonSave!click!validateSave"] && $.__views.buttonSave.addEventListener("click", validateSave);
    __defers["$.__views.__alloyId23!click!openRepeat"] && $.__views.__alloyId23.addEventListener("click", openRepeat);
    __defers["$.__views.__alloyId26!click!openContent"] && $.__views.__alloyId26.addEventListener("click", openContent);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;