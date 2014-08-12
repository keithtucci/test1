var lib_adminlocation = require('lib_adminlocation');
var args = arguments[0] || {}, parentWin = $.tab, oLocInfo = {}, aLoc = [];

function GetAdminLocation() {
	//showLoading();
	var oArgs = {
		Callback : 'home.getadminlocation_success',
		ErrorCallback : 'home.getadminlocation_error'
	};
	lib_adminlocation.GetAdminLocation(oArgs);
}

function openMenu() {
	openNext('Menus', 'menus');
}

function openAccount() {
	openNext('Account', 'account');
}

function openCompany() {
	openNext('Company', 'company');
}

function openCampaigns() {
	openNext('Campaigns', 'campaigns');
}

function openNext(NavBarTitle, Controller) {
	var nextController = Alloy.createController(Controller, {
		parentWin : parentWin,
		NavBarTitle : NavBarTitle,
	});
	parentWin.openWindow(nextController.getView());
}

function openModal(NavBarTitle, Controller) {
	var NextController = Alloy.createController(Controller, {
		NavBarTitle : NavBarTitle
	}).getView();
	NextController.open({
		modal : true,
		animate : true
	});
}

function setLocation() {
	var rand = Math.floor((Math.random() * 100000000) + 1);
	$.imageviewBanner.image = oLocInfo.BannerImage + '?x=4';
	$.labelActionBarTitle.text = oLocInfo.Name;
	//$.labelLocationName.text = oLocInfo.Name;
}

function loadData() {
	var data = [];
	_.each(aLoc, function(oData) {
		var args = {
			oData : oData
		};
		var Controller = oData.RowType;
		var row = Alloy.createController('rowhome', args).getView();
		row.data = oData;
		data.push(row);
		// }
	});
	$.tableviewInfo.setData(data);
	$.tableviewInfo.visible = true;
	//$.tableviewInfo.height = Ti.UI.SIZE;
	//$.scrollview.scrollTo(0,0);
}

function getadminlocation_success(e) {
	Ti.API.info(e);
	oLocInfo = e.oData.oLocInfo;
	aLoc = e.oData.aLocGrid;
	setLocation();
	loadData();
	//hideLoading()
}

function getadminlocation_error(e) {
	Ti.API.info(e);
	//hideLoading();
}

function initController() {
	GetAdminLocation();
}

$.tableviewInfo.addEventListener('click', function(e) {
	Ti.API.info(e.row.data);
	var oRowData = e.row.data;
	if (oRowData.Header == 'Orders') {
		Ti.App.fireEvent('start1.setactivetab', {
			ActiveTab : 1
		});
	} else if (oRowData.Header == 'Reservations') {
		Ti.App.fireEvent('start1.setactivetab', {
			ActiveTab : 2
		});
	}
});

$.win.addEventListener('focus', function() {
	GetAdminLocation();
});

$.win.addEventListener('close', function() {
	Ti.App.removeEventListener('home.initcontroller', initController);
	Ti.App.removeEventListener('home.getadminlocation_success', getadminlocation_success);
	Ti.App.removeEventListener('home.getadminlocation_error', getadminlocation_error);
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('home.initcontroller', initController);
	Ti.App.addEventListener('home.getadminlocation_success', getadminlocation_success);
	Ti.App.addEventListener('home.getadminlocation_error', getadminlocation_error);
	initController();
});
