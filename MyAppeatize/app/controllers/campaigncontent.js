var args = arguments[0] || {}, oData = args.oData || {};
var Data = args.Data, hintHeader = 'Alert text', hintMessage = 'Message text';

$.win.title = args.NavBarTitle;

function closeWin() {
	Ti.App.fireEvent('addcampaign.setcontent', {
		CampaignHeader : $.textareaHeader.value,
		CampaignText : $.textareaMessage.value,
	});
	$.win.close();
}

function setData() {
	//$.textareaText.hintText = 'Enter ' + args.NavBarTitle;
	//$.textareaText.value = Data;
}

$.textareaHeader.addEventListener('blur', function(e) {
	hintHeaderText();
});

$.textareaHeader.addEventListener('focus', function(e) {
	if ($.textareaHeader.value == hintHeader) {
		$.textareaHeader.setValue("");
		$.textareaHeader.setColor("#177EFB");
	}
});

function hintHeaderText() {
	if ($.textareaHeader.value.length == 0) {
		$.textareaHeader.setColor("##C7C7CD");
		$.textareaHeader.setValue(hintHeader);
	}
}

$.textareaMessage.addEventListener('blur', function(e) {
	hintMessageText();
});

$.textareaMessage.addEventListener('focus', function(e) {
	if ($.textareaMessage.value == hintMessage) {
		$.textareaMessage.setValue("");
		$.textareaMessage.setColor("#177EFB");
	}
});

function hintMessageText() {
	if ($.textareaMessage.value.length == 0) {
		$.textareaMessage.setColor("##C7C7CD");
		$.textareaMessage.setValue(hintMessage);
	}
}

function doValidate() {
	var IsValid = true;
	if (IsValid)
		doSave();
}

function doSave() {
	Ti.App.fireEvent(args.Callback, {
		//Data : $.textareaText.value
	});
	closeWin();
}

function textareaHeader_return() {
	$.textareaMessage.focus();
}

$.win.addEventListener('focus', function(e) {
	hintHeaderText();
	hintMessageText();
	Ti.API.info(oData);
	if (oData.CampaignHeader != null && oData.CampaignHeader.length > 0) {
		$.textareaHeader.setValue("");
		$.textareaHeader.setColor("#177EFB");		
		$.textareaHeader.value = oData.CampaignHeader;
	}
	if (oData.CampaignText != null && oData.CampaignText.length > 0) {
		$.textareaMessage.setValue("");
		$.textareaMessage.setColor("#177EFB");		
		$.textareaMessage.value = oData.CampaignText;
	}
});

$.win.addEventListener('close', function() {
	$.destroy();
});

$.win.addEventListener('open', function() {

});

setData();
