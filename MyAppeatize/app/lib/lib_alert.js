var alertDialog = Ti.UI.createAlertDialog();

exports.showAlert = function(Message, MessageTitle, MessageButtonTitle) {
	var ButtonNames = [];
	MessageButtonTitle = MessageButtonTitle || 'OK';  
	ButtonNames.push(MessageButtonTitle);
	alertDialog.title = MessageTitle;
	alertDialog.message = Message;
	alertDialog.buttonNames = ButtonNames;
	alertDialog.show();
};
