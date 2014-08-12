var lib_ordertext = require('lib_ordertext');
var args = arguments[0] || {}, parentWin = args.parentWin;

$.win.title = args.NavBarTitle;

function closeWin() {
	$.win.close();
}

function openSettings() {
	openNext('settings', {}, 'Settings');
}

function doLogOut() {
	closeWin();
	Ti.App.fireEvent('logout');
}

function openNext(Controller, oOrder, NavBarTitle) {
	Ti.API.info('openNext');
	var nextController = Alloy.createController(Controller, {
		parentWin : parentWin,
		NavBarTitle : NavBarTitle,
	});
	parentWin.openWindow(nextController.getView());
}

function showLoading(Message) {
	$.activityindicatorLoading.show();
}

function hideLoading() {
	$.activityindicatorLoading.hide();
}

function initController() {
}

$.win.addEventListener('close', function() {
	Ti.App.removeEventListener('account.closewin', closeWin);
	$.destroy();
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('account.closewin', closeWin);
	initController();
});
