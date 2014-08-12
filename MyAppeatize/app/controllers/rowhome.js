var args = arguments[0] || {}, RowData = args.oData;
Ti.API.info(args);

$.labelRowHeader.text = RowData.Header;
$.labelProp1.text = RowData.Prop1;
$.labelVal1.text = RowData.Val1;
$.labelProp2.text = RowData.Prop2;
$.labelVal2.text = RowData.Val2;

//$.viewAction.backgroundColor = RowData.ColorHex;
