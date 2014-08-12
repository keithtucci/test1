var args = arguments[0] || {}, Locations = args.Locations || [], parentWin = args.parentWin;
var lib_session = require('lib_session');

Ti.API.info(Locations);

function closeWin() {
	$.win.close({
		animated : false
	});
}

function loadData() {
	var data = [];
	_.each(Locations, function(oData) {
		Ti.API.info(oData);
		var row = Alloy.createController('tableviewrow', args).getView();
		row.data = oData;
		row.title = oData.Name;
		row.hasChild = true;
		data.push(row);
	});
	$.tableview.setData(data);
}

function doLogOut() {

}

function SetLocation(LocationId) {
	//showLoading('Logging in...');
	var oArgs = {
		LocationId : LocationId,
		Callback : 'locations.setlocation_success',
		ErrorCallback : 'locations.setlocation_error'
	};
	lib_session.SetLocation(oArgs);
}

function openStart() {
	// var start1 = Alloy.createController('start1', {
	// parentWin : parentWin,
	// });
	// parentWin.openWindow(start1.getView());
	//Ti.App.fireEvent('openStart');
	//FIRE START LOAD EVENT
	//Ti.App.fireEvent('openStart');
	closeWin();
}

function initController() {
	loadData();
}

$.tableview.addEventListener('click', function(e) {
	Ti.API.info(e.row.data);
	var LocationId = e.row.data.LocationId || 0;
	Ti.App.Properties.setString('LocationId', LocationId);
	SetLocation(LocationId);
});

function setlocation_success(e) {
	Ti.API.info(e);
	Ti.App.fireEvent('company.initcontroller');
	Ti.App.fireEvent('menus.initcontroller');
	Ti.App.fireEvent('orders.initcontroller');
	closeWin();
	//openStart();
	//hideLoading();
}

function setlocation_error(e) {
	Ti.API.info(e);
	//hideLoading();
}

$.win.addEventListener('focus', function() {

});

$.win.addEventListener('close', function() {
	Ti.App.removeEventListener('locations.closewin', closeWin);
	Ti.App.removeEventListener('locations.setlocation_success', setlocation_success);
	Ti.App.removeEventListener('locations.setlocation_error', setlocation_error);
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('locations.closewin', closeWin);
	Ti.App.addEventListener('locations.setlocation_success', setlocation_success);
	Ti.App.addEventListener('locations.setlocation_error', setlocation_error);
	initController();
});

