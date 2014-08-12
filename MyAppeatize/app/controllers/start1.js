function closeWin() {
	$.tabgroup.close();
}

function activeTab(ActiveTab) {
	$.tabgroup.activeTab = ActiveTab;
}

function setActiveTab(e) {
	Ti.API.info(e);
	var ActiveTab = e.ActiveTab;
	activeTab(ActiveTab);
}

function initController() {
	Ti.App.fireEvent('home.initcontroller');
	Ti.App.fireEvent('orders.initcontroller');
	Ti.App.fireEvent('reservations.initcontroller');
	Ti.App.fireEvent('loyalty.initcontroller');
	Ti.App.fireEvent('deals.initcontroller');
}

$.tabgroup.addEventListener('close', function() {
	Ti.App.removeEventListener('start1.closewin', closeWin);
	Ti.App.removeEventListener('start1.setactivetab', setActiveTab);	
});

$.tabgroup.addEventListener('open', function() {
	Ti.App.addEventListener('start1.closewin', closeWin);
	Ti.App.addEventListener('start1.setactivetab', setActiveTab);	
	initController();
});
