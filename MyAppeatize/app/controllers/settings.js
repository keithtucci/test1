var args = arguments[0] || {}, parentWin = args.parentWin;

$.win.title = args.NavBarTitle;

var emailDialog = Ti.UI.createEmailDialog();
emailDialog.subject = Alloy.CFG.AppName + ' Support';
emailDialog.toRecipients = [Alloy.CFG.SupportEmail];
emailDialog.messageBody = '***\n' + Ti.Platform.model + ' ' + Ti.Platform.name + ' ' + Ti.Platform.version + ' (' + Ti.Platform.osname + ')\n' + Alloy.CFG.AppName + ' ' + Ti.App.version + '\n\n***\n\n';

function closeWin() {
	$.win.close();
}

function doNotifications() {
	Ti.API.info('doNotifications');
	if ($.switchNotifications.value == true) {
		Ti.App.fireEvent('registerPushNotifications');
	}
}

function initController() {
	$.switchNotifications.value = false;
	$.labelVersion.text = 'v' + Ti.App.version + Alloy.CFG.Environment;
	//GetOrderBySession();
}

function doUrl() {
	Titanium.Platform.openURL(Alloy.CFG.CompanyUrl);
}

function doEmail() {
	emailDialog.open();
}

$.win.addEventListener('close', function() {
	$.destroy();
});

$.win.addEventListener('open', function() {
	initController();
});
