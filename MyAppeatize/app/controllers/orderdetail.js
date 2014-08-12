var lib_ordertext = require('lib_ordertext'), moment = require('alloy/moment');
var parentWin = $.tab, args = arguments[0] || {}, oOrder = {}, OrderId = args.OrderId;

$.win.title = args.NavBarTitle;

function closeWin() {
	$.win.close();
}

function doPhone() {
	var PhoneNumber = oOrder.Phone;
	var CleanPhoneNumber = PhoneNumber.replace(/[^\d]/g, "");
	Ti.API.info(CleanPhoneNumber);
	Titanium.Platform.openURL('tel:' + CleanPhoneNumber);
}

function openDialogDeleteActions(e) {
	$.dialogDeleteActions.show();
}

$.dialogDeleteActions.addEventListener('click', function(e) {
	//Ti.API.info(e);
	if (e.index == 0) {
		doDelete();
	}
});

function doNext(e) {
	Ti.API.info('doNext');
	Ti.API.info(e);
	UpdateOrderStatus(false);
}

function doDelete() {
	UpdateOrderStatus(true);
}

function UpdateOrderStatus(IsDelete) {
	showLoading();
	Ti.API.info('UpdateOrderStatus');
	var oArgs = {
		OrderId : OrderId,
		IsDelete : IsDelete,
		Callback : 'orderdetail.updateorderstatus_success',
		ErrorCallback : 'orderdetail.updateorderstatus_error'
	};
	lib_ordertext.UpdateOrderStatus(oArgs);
}

function updateorderstatus_success(e) {
	Ti.API.info(e);
	hideLoading();
	GetOrderDetail();
}

function updateorderstatus_error(e) {
	Ti.API.info(e);
	hideLoading();
}

function GetOrderDetail() {
	//showLoading();
	var DtNow = moment().format('YYYY-MM-DD HH:mm:ss');
	var oArgs = {
		OrderId : OrderId,
		DtNow : DtNow,
		Callback : 'orderdetail.getorderdetail_success',
		ErrorCallback : 'orderdetail.getorderdetail_error'
	};
	lib_ordertext.GetOrderDetail(oArgs);
}

function loadData() {
	//$.labelOrderNumber.text = 'Order #' + args.oData.OrderNumber;
	$.labelOrderStatusName.text = oOrder.OrderStatusName;
	$.labelName.text = oOrder.Name;
	$.buttonPhone.title = '  ' + oOrder.Phone;
	$.labelDtCreated.text = moment(oOrder.DtCreated).fromNow();
	// $.labelDtEstComplete.text = oOrder.TimeText;
	$.textareaOrderText.value = oOrder.OrderText;

	if (oOrder.NextStatusName != '') {
		$.viewAction.backgroundColor = oOrder.ColorHex;
		$.buttonAction.title = oOrder.NextStatusName;
		$.viewAction.width = 120;
		$.viewRowMain.right = 130;
	} else {
		$.viewAction.enabled = false;
		$.viewAction.visible = false;
		$.viewAction.width = 0;
		$.viewRowMain.right = 10;
		//$.viewLabels.right = 54;
	}

	$.viewData.visible = true;
}

function getorderdetail_success(e) {
	Ti.API.info('getorderdetail_success');
	Ti.API.info(e);
	oOrder = e.oData.oOrder;
	Ti.API.info(oOrder);
	loadData();
	hideLoading();
}

function getorderdetail_error(e) {
	Ti.API.info(e);
	hideLoading();
}

function initController() {
	Ti.API.info('initController');
	GetOrderDetail();
}

function showLoading(Message) {
	$.activityindicatorLoading.show();
	$.viewLoading.visible = true;
}

function hideLoading() {
	$.viewLoading.visible = false;
	$.activityindicatorLoading.hide();
}

$.win.addEventListener('focus', function() {
	//initController();
});

function doUpdateOrderStatus() {
	UpdateOrderStatus(false);
}

$.win.addEventListener('close', function() {
	Ti.App.removeEventListener('orderdetail.initcontroller', initController);
	Ti.App.removeEventListener('orderdetail.getorderdetail_success', getorderdetail_success);
	Ti.App.removeEventListener('orderdetail.getorderdetail_error', getorderdetail_error);
	Ti.App.removeEventListener('orderdetail.updateorderstatus_success', updateorderstatus_success);
	Ti.App.removeEventListener('orderdetail.updateorderstatus_error', updateorderstatus_error);
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('orderdetail.initcontroller', initController);
	Ti.App.addEventListener('orderdetail.getorderdetail_success', getorderdetail_success);
	Ti.App.addEventListener('orderdetail.getorderdetail_error', getorderdetail_error);
	Ti.App.addEventListener('orderdetail.updateorderstatus_success', updateorderstatus_success);
	Ti.App.addEventListener('orderdetail.updateorderstatus_error', updateorderstatus_error);
	initController();
});
