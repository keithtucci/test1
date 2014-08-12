var args = arguments[0] || {}, RowData = args.oData;
Ti.API.info(args);

if (RowData.LeftMargin > 0)
	$.labelMenuVal.left = RowData.LeftMargin;

if (RowData.TopMargin > 0)
	$.labelMenuVal.top = RowData.TopMargin;

if (RowData.FontSize > 0) {
	$.labelMenuVal.font = {
		fontSize : RowData.FontSize + 4
	};
	$.labelPrice.font = {
		fontSize : RowData.FontSize + 4
	};
}

if (RowData.Align == 'left') {
	$.labelMenuVal.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
} else if (RowData.Align == 'right') {
	$.labelMenuVal.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
} else if (RowData.Align == 'center') {
	$.labelMenuVal.textAlign = Ti.UI.TEXT_ALIGNMENT_CENTER;
	$.labelMenuVal.right = 0;
}

if (RowData.IsItalic) {
	$.labelMenuVal.font = {
		fontFamily : "Helvetica-Oblique",
	};
}

if (RowData.IsBold) {
	$.labelMenuVal.font = {
		fontWeight : "bold",
		fontSize : RowData.FontSize + 4
	};
}

if (RowData.IsGrey)
	$.labelMenuVal.color = "#AAAAAA";

if (RowData.Price != "") {
	//$.labelMenuVal.right = 70;
	$.labelPrice.text = RowData.Price;
}

if (RowData.Val != "")
	$.labelMenuVal.text = RowData.Val;
