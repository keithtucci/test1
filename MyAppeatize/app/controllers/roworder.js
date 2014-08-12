var args = arguments[0] || {}, RowData = args.oData;
Ti.API.info(args);

$.labelOrderStatusName.text = RowData.OrderStatusName;

if (RowData.OrderText != "") {
	var OrderText = RowData.OrderText.replace(/(\r\n|\n|\r)/gm, " ");
	$.labelOrderText.text = OrderText;
}

$.labelName.text = RowData.Name;
$.labelDtCreated.text = moment(RowData.DtCreated).fromNow();
$.labelDtEstComplete.text = RowData.OrderNumber + ' - ' + RowData.TimeText;

if (RowData.NextStatusName != '') {
	$.viewAction.backgroundColor = RowData.ColorHex;
	$.buttonAction.title = RowData.NextStatusName;
	$.viewAction.width = 120;
	$.viewLabels.right = 120;
} else {
	$.viewAction.enabled = false;
	//$.viewLabels.right = 54;
}

function doOrderDetails() {
	Ti.App.fireEvent('orders.openorderdetail', {
		oData : RowData
	});
}

function doUpdateOrderStatus() {
	Ti.App.fireEvent('orders.updateorderstatus', {
		oData : RowData
	});
}
