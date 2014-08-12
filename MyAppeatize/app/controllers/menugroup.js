var lib_menu = require('lib_menu');
var parentWin = parentWin, args = arguments[0] || {}, oMenuGroup = {}, aMenuGroup = [], oMenuItem = {}, aMenuItem = [], oMenu = args.oMenu || {};

$.win2.title = args.NavBarTitle;

var menuGroupRefreshControl = Ti.UI.createRefreshControl({
	tintColor : "#FC3D39"
});

$.tableviewMenuGroup.refreshControl = menuGroupRefreshControl;

menuGroupRefreshControl.addEventListener('refreshstart', function(e) {
	GetMenuGroup();
	menuGroupRefreshControl.endRefreshing();
});

var menuItemRefreshControl = Ti.UI.createRefreshControl({
	tintColor : "#FC3D39"
});

$.tableviewMenuItem.refreshControl = menuItemRefreshControl;

menuItemRefreshControl.addEventListener('refreshstart', function(e) {
	GetMenuItem();
	menuItemRefreshControl.endRefreshing();
});

function closeWin() {
	$.win.close();
}

function setMenuGroupMoveable() {
	Ti.API.info($.tableviewMenuGroup.moving);
	if ($.tableviewMenuGroup.moving) {
		ReorderMenuText($.tableviewMenuGroup.data[0]);
		$.tableviewMenuGroup.moving = false;
		$.buttonEditMenuGroup.title = 'Edit';
	} else {
		$.buttonEditMenuGroup.title = 'Done';
		$.tableviewMenuGroup.moving = true;
	}
	$.buttonEditMenuGroup.width = Ti.UI.SIZE;
}

function setMenuItemMoveable() {
	Ti.API.info($.tableviewMenuItem.moving);
	if ($.tableviewMenuItem.moving) {
		ReorderMenuText($.tableviewMenuItem.data[0]);
		$.tableviewMenuItem.moving = false;
		$.buttonEditMenuItem.title = 'Edit';
	} else {
		$.buttonEditMenuItem.title = 'Done';
		$.tableviewMenuItem.moving = true;
	}
	$.buttonEditMenuItem.width = Ti.UI.SIZE;
}

function openMenuGroups() {
	var menugroups = Alloy.createController('menugroups', {
		parentWin : parentWin,
		NavBarTitle : args.NavBarTitle,
	});
	parentWin.openWindow(menugroups.getView());
}

function GetMenuGroup() {
	//showLoading();
	var oArgs = {
		MenuId : oMenu.MenuId,
		Callback : 'menugroups.getmenugroup_success',
		ErrorCallback : 'menugroups.getmenugroup_error'
	};
	lib_menu.GetMenuGroup(oArgs);
}

function GetMenuItem() {
	//showLoading();
	setMenuGroupData();
	var oArgs = {
		MenuTextId : oMenuGroup.MenuTextId,
		Callback : 'menugroups.getmenuitem_success',
		ErrorCallback : 'menugroups.getmenuitem_error'
	};
	lib_menu.GetMenuItem(oArgs);
}

function ReorderMenuText(tableviewData) {
	//showLoading();
	var IdList = '';
	var tableSection = tableviewData;
	for (var j = 0; j < tableSection.rowCount; j++) {
		var row = tableSection.rows[j];
		IdList += row.data.MenuTextId + ',';
	}

	var oArgs = {
		MenuId : oMenu.MenuId,
		MenuTextTypeCode : '',
		IdList : IdList,		
		Callback : 'menugroups.reordertext_success',
		ErrorCallback : 'menugroups.reordertext_error'
	};
	lib_menu.ReorderMenuText(oArgs);
}

function loadMenuGroup() {
	if (aMenuGroup.length > 0) {
		var data = [], args = {};
		_.each(aMenuGroup, function(oData) {
			Ti.API.info(oData);
			args = {
				oData : oData
			};
			var row = Alloy.createController('rowgeneric1', args).getView();
			row.data = oData;
			//row.title = oData.Name;
			//row.hasChild = true;
			//row.hasDetail = true;
			data.push(row);
		});
		$.tableviewMenuGroup.editable = false;
		$.tableviewMenuGroup.setData(data);
		//$.tab.setBadge(3);
		oMenuGroup = $.tableviewMenuGroup.data[0].rows[0].data;
		GetMenuItem();
	} else {
		$.tableviewMenuItem.setData([]);
		$.tableviewMenuGroup.setData([]);
	}
}

function loadMenuItem() {
	if (aMenuItem.length > 0) {
		var data = [], args = {};
		_.each(aMenuItem, function(oData) {
			Ti.API.info(oData);
			args = {
				oData : oData
			};
			var row = Alloy.createController('rowgeneric2', args).getView();
			row.data = oData;
			//row.title = oData.Name;
			// row.hasChild = false;
			// row.hasDetail = true;
			data.push(row);
		});
		$.tableviewMenuItem.editable = false;
		$.tableviewMenuItem.setData(data);
		//$.tab.setBadge(3);
	} else {
		$.tableviewMenuItem.setData([]);
	}
}

function getmenugroup_success(e) {
	Ti.API.info(e);
	//hideLoading();
	aMenuGroup = e.oData.aMenuGroup;
	loadMenuGroup();
}

function getmenugroup_error(e) {
	Ti.API.info(e);
	//hideLoading();
}

function getmenuitem_success(e) {
	Ti.API.info(e);
	//hideLoading();
	aMenuItem = e.oData.aMenuItem;
	loadMenuItem();
}

function getmenuitem_error(e) {
	Ti.API.info(e);
	//hideLoading();
}

function reordertext_success(e) {
	Ti.API.info(e);
	//GetMenuList();
	//hideLoading();
}

function reordertext_error(e) {
	Ti.API.info(e);
	//hideLoading();
}

$.tableviewMenuGroup.addEventListener('click', function(e) {
	Ti.API.info('e.row');
	oMenuGroup = e.row.data || {};
	GetMenuItem();
});

$.tableviewMenuItem.addEventListener('click', function(e) {
	Ti.API.info('e.row');
	oMenuItem = e.row.data || {};
	editMenuItem();
});

function addMenuItem() {
	openAddGeneric1('Add Menu Item', 'menugroups.getmenuitem', 'dish', oMenuGroup.MenuId, oMenuGroup.MenuTextId, oMenuItem.MenuTextId);
}

function editMenuItem() {
	openAddGeneric1(oMenu.Name, 'menugroups.getmenuitem', 'dish', oMenuGroup.MenuId, oMenuGroup.MenuTextId, oMenuItem.MenuTextId, oMenuItem);
}

function addMenuGroup() {
	openAddGeneric1('Add Menu Group', 'menugroups.getmenugroup', 'group', oMenu.MenuId, 0, 0);
}

function editMenuGroup() {
	openAddGeneric1(oMenuGroup.Name, 'menugroups.getmenugroup', 'group', oMenuGroup.MenuId, 0, oMenuGroup.MenuTextId, oMenuGroup);
}

function openAddGeneric1(NavBarTitle, Callback, MenuTextTypeCode, MenuId, ParentMenuTextId, MenuTextId, oEditData) {
	var addgeneric1 = Alloy.createController('addgeneric1', {
		NavBarTitle : NavBarTitle,
		Callback : Callback,
		MenuTextTypeCode : MenuTextTypeCode,
		MenuId : MenuId,
		ParentMenuTextId : ParentMenuTextId,
		MenuTextId : MenuTextId,
		oEditData : oEditData
	}).getView();
	addgeneric1.open({
		modal : true,
		animated : true,
		modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
	});
}

function setMenuGroupData() {
	$.buttonMenuGroupLabel.title = oMenuGroup.Name;
}

function initController() {
	// LocationId = Ti.App.Properties.getString('LocationId');
	GetMenuGroup();
}

$.win.addEventListener('close', function() {
	Ti.App.removeEventListener('menugroups.closewin', closeWin);
	Ti.App.removeEventListener('menugroups.initcontroller', initController);
	Ti.App.removeEventListener('menugroups.getmenugroup_success', getmenugroup_success);
	Ti.App.removeEventListener('menugroups.getmenugroup_error', getmenugroup_error);
	Ti.App.removeEventListener('menugroups.getmenuitem_success', getmenuitem_success);
	Ti.App.removeEventListener('menugroups.getmenuitem_error', getmenuitem_error);
	Ti.App.removeEventListener('menugroups.reordertext_success', reordertext_success);
	Ti.App.removeEventListener('menugroups.reordertext_error', reordertext_error);
	Ti.App.removeEventListener('menugroups.getmenugroup', GetMenuGroup);
	Ti.App.removeEventListener('menugroups.getmenuitem', GetMenuItem);
	Ti.App.fireEvent('menus.getmenulist');
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('menugroups.closewin', closeWin);
	Ti.App.addEventListener('menugroups.initcontroller', initController);
	Ti.App.addEventListener('menugroups.getmenugroup_success', getmenugroup_success);
	Ti.App.addEventListener('menugroups.getmenugroup_error', getmenugroup_error);
	Ti.App.addEventListener('menugroups.getmenuitem_success', getmenuitem_success);
	Ti.App.addEventListener('menugroups.getmenuitem_error', getmenuitem_error);
	Ti.App.addEventListener('menugroups.reordertext_success', reordertext_success);
	Ti.App.addEventListener('menugroups.reordertext_error', reordertext_error);
	Ti.App.addEventListener('menugroups.getmenugroup', GetMenuGroup);
	Ti.App.addEventListener('menugroups.getmenuitem', GetMenuItem);
	initController();
});
