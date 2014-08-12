var args = arguments[0] || {}, RowData = args.oData;
Ti.API.info(args);

if (RowData.OrderStatusName != "")
	$.labelProp.text = RowData.Prop;

if (RowData.OrderNumber != "")
	$.labelVal.text = RowData.Val;

$.viewAction.backgroundColor = RowData.ColorHex;
