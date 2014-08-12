var lib_ordertext = require('lib_ordertext'), moment = require('alloy/moment');
var parentWin = $.tab, args = arguments[0] || {}, aOrders = [], oOrderDetail = {}, oOrderText = {}, oOrder = {};

function openDialogDeleteActions(e) {
	$.dialogDeleteActions.show();
}

$.dialogDeleteActions.addEventListener('click', function(e) {
	//Ti.API.info(e);
	if (e.index == 0) {
		doDelete();
	}
});

function doNext() {
	UpdateOrderStatus(false);
}

function doDelete() {
	UpdateOrderStatus(true);
}

function UpdateOrderStatus(IsDelete) {
	showLoading('Updating...');
	Ti.API.info('UpdateOrderStatus');
	var oArgs = {
		OrderId : oOrder.OrderId,
		IsDelete : IsDelete,
		Callback : 'orders.updateorderstatus_success',
		ErrorCallback : 'orders.updateorderstatus_error'
	};
	lib_ordertext.UpdateOrderStatus(oArgs);
}

function GetOrderByLocation() {
	//showLoading();
	var DtNow = moment().format('YYYY-MM-DD HH:mm:ss');
	Ti.API.info('GetOrderByLocation');
	var oArgs = {
		DtNow : DtNow,
		Callback : 'orders.getorderbylocation_success',
		ErrorCallback : 'orders.getorderbylocation_error'
	};
	lib_ordertext.GetOrderByLocation(oArgs);
}

function loadOrders() {
	if (aOrders.length > 0) {
		var data = [], args = {};
		_.each(aOrders, function(oData) {
			//Ti.API.info(oData);
			args = {
				oData : oData
			};
			var row = Alloy.createController('roworder', args).getView();
			row.data = oData;
			data.push(row);
		});
		$.tableviewOrders.setData(data);
		$.viewData.visible = true;
		$.viewNoData.visible = false;		
		//oOrder = $.tableviewOrders.data[0].rows[0].data;
		//GetOrderDetail();
	} else {
		$.tableviewOrders.setData([]);
		$.viewNoData.visible = true;
		$.viewData.visible = false;
	}
}

function loadOrderDetail() {
	$.labelOrderStatusNameData.text = oOrderDetail.OrderStatusName;
	$.textareaOrderText.value = oOrderText.OrderText;
	$.labelOrderNumberNameData.text = oOrderDetail.OrderNumber + ' - ' + oOrderDetail.Name;
}

function getorderbylocation_success(e) {
	Ti.API.info(e);
	hideLoading();
	aOrders = e.oData.aOrder;
	loadOrders();
}

function getorderbylocation_error(e) {
	Ti.API.info(e);
	hideLoading();
}

function updateorderstatus_success(e) {
	Ti.API.info(e);
	//hideLoading();
	GetOrderByLocation();
}

function updateorderstatus_error(e) {
	Ti.API.info(e);
	//hideLoading();
}

function openOrderDetail() {
	var nextController = Alloy.createController('orderdetail', {
		parentWin : parentWin,
		NavBarTitle : oOrder.OrderNumber + ' - ' + oOrder.TimeText,
		OrderId : oOrder.OrderId,
	});
	parentWin.openWindow(nextController.getView());
}

function doOpenOrderDetail(e) {
	Ti.API.info('doOpenOrderDetail');
	Ti.API.info(e);
	oOrder = e.oData || {};
	openOrderDetail();
}

function doUpdateOrderStatus(e) {
	Ti.API.info(e);
	oOrder = e.oData || {};
	UpdateOrderStatus(false);
}

function doRefresh() {
	GetOrderByLocation();
}

function initController() {
	Ti.API.info('initController');
	GetOrderByLocation();
}

function showLoading(Message) {
	//if (Message != null && Message.length > 0)
		//$.labelLoadingMessage.text = Message;
	$.activityindicatorLoading.show();
	//$.win.animate({view:$.viewLoading,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	$.viewLoading.visible = true;
	
}

function hideLoading() {
	$.viewLoading.visible = false;
	//$.win.animate({view:$.viewData,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	$.activityindicatorLoading.hide();
}

$.win.addEventListener('focus', function() {
	//initController();
	GetOrderByLocation();
});

$.win.addEventListener('close', function() {
	Ti.App.removeEventListener('orders.initcontroller', initController);
	Ti.App.removeEventListener('orders.getorderbylocation_success', getorderbylocation_success);
	Ti.App.removeEventListener('orders.getorderbylocation_error', getorderbylocation_error);
	Ti.App.removeEventListener('orders.updateorderstatus_success', updateorderstatus_success);
	Ti.App.removeEventListener('orders.updateorderstatus_error', updateorderstatus_error);
	Ti.App.removeEventListener('orders.openorderdetail', doOpenOrderDetail);
	Ti.App.removeEventListener('orders.updateorderstatus', doUpdateOrderStatus);
	Ti.App.removeEventListener('orders.getorderbylocation', GetOrderByLocation);
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('orders.initcontroller', initController);
	Ti.App.addEventListener('orders.getorderbylocation_success', getorderbylocation_success);
	Ti.App.addEventListener('orders.getorderbylocation_error', getorderbylocation_error);
	Ti.App.addEventListener('orders.updateorderstatus_success', updateorderstatus_success);
	Ti.App.addEventListener('orders.updateorderstatus_error', updateorderstatus_error);
	Ti.App.addEventListener('orders.openorderdetail', doOpenOrderDetail);
	Ti.App.addEventListener('orders.updateorderstatus', doUpdateOrderStatus);
	Ti.App.addEventListener('orders.getorderbylocation', GetOrderByLocation);
	//initController();
});
