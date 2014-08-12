var args = arguments[0] || {};
var qData = [], Header, Callback = args.Callback, Id = args.Id;
qData = args.qData;

$.win.title = args.NavBarTitle;

$.win.addEventListener('focus', function() {
	loadData();
});

function closeWin() {
	$.win.close({
		animated : true
	});
}

function loadData() {
	//Ti.API.info();
	var data = [];
	var i = 0;
	var oIndex = {};
	var qIndex = [];
	_.each(qData, function(oData) {
		var args = {
			oData : oData
		};
		var row = Alloy.createController('selectorgenericrow', args).getView();
		row.data = oData;
		oData.HasDescr = false;
		row.hasCheck = oData.IsSelected;
		data.push(row);
		i++;
	});
	$.tableview.setData(data);
}

function doSave() {
	//loadData(e.row.data.Id);
	Ti.App.fireEvent(Callback, {
		qData : qData
	});
	closeWin();
}

$.tableview.addEventListener('click', function(e) {
	//Ti.API.info(JSON.stringify(e.row));
	var HasSelection = false;
	_.each(qData, function(oData) {
		if (oData.Id == e.row.data.Id) {
			if (oData.IsSelected == 1) {
				oData.IsSelected = 0;
			} else {
				oData.IsSelected = 1;
				HasSelection = true;
			}
		}
	});
	loadData();
});


$.win.addEventListener('close', function() {
	qData = [];
	$.destroy();
});

