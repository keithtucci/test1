var args = arguments[0] || {}, parentWin = args.parentWin, oDetail = {}, aDay = [], CampaignId = args.Id || 0, StartDate = new Date(), CampaignHeader = '', CampaignText = '', RepeatText = '';
var moment = require('alloy/moment'), lib_campaign = require('lib_campaign');

$.win.title = args.NavBarTitle;

function closeWin() {
	$.win.close();
}

function validateSave() {
	var aSaveDay = [], CampaignName = '', DayIdList = '', TimeSend = $.pickerCampaignTime.value, DtEffective = '', IsActive = !$.switchPause.value;
	_.each(aDay, function(oData) {
		if (oData.IsSelected)
			aSaveDay.push(oData.Id);
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
	if (IsValid && CampaignName.length == 0) {
		IsValid = false;
		$.alertDialog.message = 'Oops, a campaign name is required to proceed.';
		$.alertDialog.show();
	}
	if (IsValid && CampaignHeader.length == 0) {
		IsValid = false;
		$.alertDialog.message = 'Oops, alert text is required to proceed.';
		$.alertDialog.show();
	}
	if (IsValid && CampaignText.length == 0) {
		IsValid = false;
		$.alertDialog.message = 'Oops, message text is required to proceed.';
		$.alertDialog.show();
	}
	if (IsValid)
		CommitCampaign(CampaignName, DayIdList, TimeSend, DtEffective, IsActive);
}

function CommitCampaign(CampaignName, DayIdList, TimeSend, DtEffective, IsActive) {
	//showLoading('Updating...');
	var oArgs = {
		CampaignId : CampaignId,
		CampaignName : CampaignName,
		RepeatText : RepeatText,
		DayIdList : DayIdList,
		TimeSend : TimeSend,
		DtEffective : DtEffective,
		IsActive : IsActive,
		CampaignHeader : CampaignHeader,
		CampaignText : CampaignText,
		Callback : 'addcampaign.commitcampaign_success',
		ErrorCallback : 'addcampaign.commitcampaign_error'
	};
	lib_campaign.CommitCampaign(oArgs);
}

function GetCampaignDetail() {
	//showLoading('Updating...');
	var oArgs = {
		CampaignId : CampaignId,
		Callback : 'addcampaign.getcampaigndetail_success',
		ErrorCallback : 'addcampaign.getcampaigndetail_error'
	};
	lib_campaign.GetCampaignDetail(oArgs);
}

function openRepeat() {
	Ti.API.info('openRepeat');
	openSelectorMulti('Repeat', 'addcampaign.setrepeat', aDay, 0);
}

function openContent() {
	Ti.API.info('openCampaignContent');
	var oData = {
		CampaignHeader : CampaignHeader,
		CampaignText : CampaignText
	};
	openNext('campaigncontent', 'Content', 'addcampaign.setcontent', oData);
}

function openSelectorMulti(NavBarTitle, Callback, qData, SetId) {
	Ti.API.info('openSelectorMulti');
	var SelectedId = 0;
	var NextController = Alloy.createController('selectormultigeneric', {
		qData : qData,
		NavBarTitle : NavBarTitle,
		Callback : Callback,
		SelectedId : SelectedId,
		Id : 0,
		parentWin : $.win
	});
	$.win.openWindow(NextController.getView());
}

function openNext(Controller, NavBarTitle, Callback, oData) {
	var NextController = Alloy.createController(Controller, {
		oData : oData,
		NavBarTitle : NavBarTitle,
		Callback : Callback
	});
	$.win.openWindow(NextController.getView());
}

function loadData() {
	if (oDetail != null) {
		StartDate = oDetail.DtEffective;
		$.labelStartDateVal.text = moment(StartDate).format("MMMM Do YYYY");
		Ti.API.info(new Date());
		$.pickerCampaignTime.value = new Date(moment(oDetail.TimeSend).format('MM/DD/YYYY hh:mm a'));
		$.textfieldCampaignName.value = oDetail.CampaignName;
		CampaignText = oDetail.CampaignText;
		CampaignHeader = oDetail.CampaignHeader;
		DtEffective = oDetail.DtEffective;
		if (CampaignHeader != null && CampaignHeader.length > 0)
			$.labelContentVal.text = CampaignHeader;
		else
			$.labelContentVal.text = 'None';
	} else {
		$.labelStartDateVal.text = moment(StartDate).format("MMMM Do YYYY");
	}
	setRepeat();
}

function getcampaigndetail_success(e) {
	Ti.API.info(e);
	//hideLoading();
	if (e.oData.oDetail != null)
		oDetail = e.oData.oDetail;
	aDay = e.oData.aDay;
	loadData();
}

function getcampaigndetail_error(e) {
	Ti.API.info(e);
	//hideLoading();
}

function commitcampaign_success(e) {
	Ti.API.info(e);
	//hideLoading();
	Ti.App.fireEvent('campaigns.dorefresh');
	closeWin();
}

function commitcampaign_error(e) {
	Ti.API.info(e);
	//hideLoading();
}

function showLoading(Message) {
	$.activityindicatorLoading.show();
}

function hideLoading() {
	$.activityindicatorLoading.hide();
}

function setContent(e) {
	Ti.API.info('setContent');
	Ti.API.info(e);
	CampaignHeader = e.CampaignHeader;
	CampaignText = e.CampaignText;
	if (CampaignHeader != null && CampaignHeader.length > 0)
		$.labelContentVal.text = CampaignHeader;
	else
		$.labelContentVal.text = 'None';
}

function setRepeat(e) {
	Ti.API.info('setRepeat');
	RepeatText = '', i = 0, WeekendCount = 0, WeekdayCount = 0;
	_.each(aDay, function(oData) {
		if (oData.IsSelected) {
			RepeatText += ' ' + oData.Descr;
			i++;
			if (oData.IsWeekend)
				WeekendCount++;
			else
				WeekdayCount++;
		}
	});
	if (RepeatText.length == 0)
		RepeatText = 'Never';
	else if ((WeekendCount + WeekdayCount) == 7)
		RepeatText = 'Everyday';
	else if (WeekendCount == 2 && WeekdayCount == 0)
		RepeatText = 'Weekends';
	else if (WeekdayCount == 5 && WeekendCount == 0)
		RepeatText = 'Weekdays';
	$.labelRepeatVal.text = RepeatText;
}

function initController() {
	//$.pickerCampaignTime.value = new Date();
	GetCampaignDetail();
}

$.win.addEventListener('close', function() {
	Ti.App.removeEventListener('addcampaign.closewin', closeWin);
	Ti.App.removeEventListener('addcampaign.getcampaigndetail_success', getcampaigndetail_success);
	Ti.App.removeEventListener('addcampaign.getcampaigndetail_error', getcampaigndetail_error);
	Ti.App.removeEventListener('addcampaign.commitcampaign_success', commitcampaign_success);
	Ti.App.removeEventListener('addcampaign.commitcampaign_error', commitcampaign_error);
	Ti.App.removeEventListener('addcampaign.setrepeat', setRepeat);
	Ti.App.removeEventListener('addcampaign.setcontent', setContent);
	$.destroy();
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('addcampaign.closewin', closeWin);
	Ti.App.addEventListener('addcampaign.getcampaigndetail_success', getcampaigndetail_success);
	Ti.App.addEventListener('addcampaign.getcampaigndetail_error', getcampaigndetail_error);
	Ti.App.addEventListener('addcampaign.commitcampaign_success', commitcampaign_success);
	Ti.App.addEventListener('addcampaign.commitcampaign_error', commitcampaign_error);
	Ti.App.addEventListener('addcampaign.setrepeat', setRepeat);
	Ti.App.addEventListener('addcampaign.setcontent', setContent);
	initController();
});
