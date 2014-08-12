var lib_campaign = require('lib_campaign'), moment = require('alloy/moment');
var args = arguments[0] || {}, parentWin = args.parentWin, aCampaign = [];

$.win.title = args.NavBarTitle;

function closeWin() {
	$.win.close();
}

function GetCampaignByLoc() {
	//showLoading();
	var DtNow = moment().format('YYYY-MM-DD HH:mm:ss');
	Ti.API.info('GetCampaignByLoc');
	var oArgs = {
		DtNow : DtNow,
		Callback : 'campaigns.getcampaignbyloc_success',
		ErrorCallback : 'campaigns.getcampaignbyloc_error'
	};
	lib_campaign.GetCampaignByLoc(oArgs);
}

function openAddCampaign(e) {
	Ti.API.info(e);
	var Id = 0;
	if (e.CampaignId != null && e.CampaignId > 0)
		Id = e.CampaignId;
	openNext('Add Campaign', 'addcampaign', Id);
}

function openModal(NavBarTitle, Controller, Id) {
	var NextController = Alloy.createController(Controller, {
		NavBarTitle : NavBarTitle,
		parentWin : parentWin,
		Id : Id
	}).getView();
	NextController.open({
		modal : true,
		animate : true
	});
}

function openNext(NavBarTitle, Controller, Id) {
	var nextController = Alloy.createController(Controller, {
		NavBarTitle : NavBarTitle,
		parentWin : parentWin,
		Id : Id
	});
	parentWin.openWindow(nextController.getView());
}

function loadData() {
	if (aCampaign.length > 0) {
		var data = [], args = {};
		_.each(aCampaign, function(oData) {
			//Ti.API.info(oData);
			args = {
				oData : oData
			};
			var row = Alloy.createController('rowcampaign', args).getView();
			row.data = oData;
			data.push(row);
		});
		$.tableview.setData(data);
		$.viewData.visible = true;
		$.viewNoData.visible = false;
	} else {
		$.tableview.setData([]);
		$.viewNoData.visible = true;
		$.viewData.visible = false;
	}
}

function getcampaignbyloc_success(e) {
	Ti.API.info(e);
	hideLoading();
	aCampaign = e.oData.aCampaign;
	loadData();
}

function getcampaignbyloc_error(e) {
	Ti.API.info(e);
	hideLoading();
}

function showLoading(Message) {
	$.activityindicatorLoading.show();
}

function hideLoading() {
	$.activityindicatorLoading.hide();
}

function initController() {
	GetCampaignByLoc();
}

function doRefresh(e) {
	GetCampaignByLoc();
}

// $.win.addEventListener('focus', function() {
// doRefresh();
// });

$.win.addEventListener('close', function() {
	Ti.App.removeEventListener('campaigns.closewin', closeWin);
	Ti.App.removeEventListener('campaigns.dorefresh', doRefresh);
	Ti.App.removeEventListener('campaigns.getcampaignbyloc_success', getcampaignbyloc_success);
	Ti.App.removeEventListener('campaigns.getcampaignbyloc_error', getcampaignbyloc_error);
	Ti.App.removeEventListener('campaigns.openaddcampaign', openAddCampaign);
	$.destroy();
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('campaigns.closewin', closeWin);
	Ti.App.addEventListener('campaigns.dorefresh', doRefresh);
	Ti.App.addEventListener('campaigns.getcampaignbyloc_success', getcampaignbyloc_success);
	Ti.App.addEventListener('campaigns.getcampaignbyloc_error', getcampaignbyloc_error);
	Ti.App.addEventListener('campaigns.openaddcampaign', openAddCampaign);
	initController();
});
