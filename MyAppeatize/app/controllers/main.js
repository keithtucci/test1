var lib_accountadmin = require('lib_accountadmin');
var args = arguments[0] || {}, parentWin = args.parentWin, aCampaign = [];

$.win.title = args.NavBarTitle;

function closeWin() {
	$.win.close();
}

function GetAdminServices() {
	//showLoading();
	Ti.API.info('GetAdminServices');
	var oArgs = {
		Callback : 'main.getadminservices_success',
		ErrorCallback : 'main.getadminservices_error'
	};
	lib_accountadmin.GetAdminServices(oArgs);
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
	Ti.App.removeEventListener('main.closewin', closeWin);
	Ti.App.removeEventListener('main.getcampaignbyloc_success', getcampaignbyloc_success);
	Ti.App.removeEventListener('main.getcampaignbyloc_error', getcampaignbyloc_error);
	$.destroy();
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('main.closewin', closeWin);
	Ti.App.addEventListener('main.getcampaignbyloc_success', getcampaignbyloc_success);
	Ti.App.addEventListener('main.getcampaignbyloc_error', getcampaignbyloc_error);
	initController();
});
