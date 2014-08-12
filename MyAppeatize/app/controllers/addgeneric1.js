var lib_menu = require('lib_menu');
var parentWin = parentWin, args = arguments[0] || {}, Callback = args.Callback, MenuTextTypeCode = args.MenuTextTypeCode || '', MenuId = args.MenuId || 0, ParentMenuTextId = args.ParentMenuTextId || 0, MenuTextId = args.MenuTextId || 0, oEditData = args.oEditData || {};

Ti.API.info(args);

$.win2.title = args.NavBarTitle;

function closeWin() {
	$.win.close();
}

function doDelete() {
	var Name = '', Descr = '', Price = 0, PriceText = '', IsActive = false;
	Name = oEditData.Name;
	Descr = oEditData.Descr;
	if (MenuTextTypeCode == 'dish') {
		Price = oEditData.Price;
		PriceText = oEditData.PriceText;
	}
	ModifyMenuItem(Name, Descr, Price, PriceText, IsActive);
}

function doValidate() {
	var IsValid = true;
	if (IsValid && $.textfieldName.value.length == 0) {
		IsValid = false;
		$.alertDialog.message = 'Oops, Name is required to proceed.';
		$.alertDialog.show();
	}
	if (IsValid && $.textfieldPrice.value.length > 0 && !($.textfieldPrice.value >= 0) && MenuTextTypeCode == 'dish') {
		IsValid = false;
		$.alertDialog.message = 'Oops, Price must be a valid number';
		$.alertDialog.show();
	}
	if (IsValid) {
		var Name = '', Descr = '', Price = 0, PriceText = '', IsActive = true;
		Name = $.textfieldName.value;
		Descr = $.textareaDescr.value;
		if (MenuTextTypeCode == 'dish') {
			Price = $.textfieldPrice.value;
			PriceText = $.textfieldPriceText.value;
		}
		ModifyMenuItem(Name, Descr, Price, PriceText, IsActive);
	}
}

function ModifyMenuItem(Name, Descr, Price, PriceText, IsActive) {
	//showLoading();
	var oArgs = {
		MenuTextTypeCode : MenuTextTypeCode,
		MenuId : MenuId,
		ParentMenuTextId : ParentMenuTextId,
		MenuTextId : MenuTextId,
		Name : Name,
		Descr : Descr,
		Price : Price,
		PriceText : PriceText,
		IsActive : IsActive,
		Callback : 'addgeneric1.modifymenuitem_success',
		ErrorCallback : 'addgeneric1.modifymenuitem_error'
	};
	lib_menu.ModifyMenuItem(oArgs);
}

function openDialogDelete() {
	$.dialogDelete.show();
}

$.dialogDelete.addEventListener('click', function(e) {
	if (e.index == 0) {
		doDelete();
	}
});

function modifymenuitem_success(e) {
	Ti.API.info(e);
	Ti.App.fireEvent(Callback);
	closeWin();
}

function modifymenuitem_error(e) {
	Ti.API.info(e);
}

function setData() {
	Ti.API.info('setData');
	Ti.API.info(oEditData);
	$.textfieldName.value = oEditData.Name;
	$.textareaDescr.value = oEditData.Descr;
	if (MenuTextTypeCode == 'dish') {
		$.tableview2.height = 156;
		$.textfieldPrice.value = oEditData.Price;
		$.textfieldPriceText.value = oEditData.PriceText;
	}
}

function doCleanNumeric(e) {
	e.source.value = e.source.value.replace(/[^0-9.]+/, "");
}

function initController() {
	Ti.API.info('initController');
	//if (oEditData != null)
	setData();
}

$.win.addEventListener('close', function() {
	Ti.App.removeEventListener('addgeneric1.closewin', closeWin);
	Ti.App.removeEventListener('addgeneric1.initcontroller', initController);
	Ti.App.removeEventListener('addgeneric1.modifymenuitem_success', modifymenuitem_success);
	Ti.App.removeEventListener('addgeneric1.modifymenuitem_error', modifymenuitem_error);
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('addgeneric1.closewin', closeWin);
	Ti.App.addEventListener('addgeneric1.initcontroller', initController);
	Ti.App.addEventListener('addgeneric1.modifymenuitem_success', modifymenuitem_success);
	Ti.App.addEventListener('addgeneric1.modifymenuitem_error', modifymenuitem_error);
	initController();
});
