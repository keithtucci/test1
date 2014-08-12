var args = arguments[0] || {}, parentWin = args.parentWin;

$.win.title = args.NavBarTitle;

function closeWin() {
	$.win.close();
}

function showLoading(Message) {
	$.activityindicatorLoading.show();
}

function hideLoading() {
	$.activityindicatorLoading.hide();
}

function initController() {
	$.viewNoData.visible = true;
}

$.win.addEventListener('close', function() {
	Ti.App.removeEventListener('company.closewin', closeWin);
	$.destroy();
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('company.closewin', closeWin);
	initController();
});
