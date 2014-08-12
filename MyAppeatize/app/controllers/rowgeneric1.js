var args = arguments[0] || {}, RowData = args.oData;
Ti.API.info(args);

if (RowData.Name != "")
	$.labelName.text = RowData.Name;

if (RowData.Descr != ""){
	$.labelDescr.height = Ti.UI.SIZE;
	$.labelDescr.text = RowData.Descr;
}