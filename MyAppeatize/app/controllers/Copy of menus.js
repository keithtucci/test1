var lib_menu = require('lib_menu');
var parentWin = $.tab, args = arguments[0] || {}, aMenuList = [], aMenu = [], oMenu = {};

var menuListRefreshControl = Ti.UI.createRefreshControl({
	tintColor : "#FC3D39"
});

$.tableviewMenuList.refreshControl = menuListRefreshControl;

menuListRefreshControl.addEventListener('refreshstart', function(e) {
	GetMenuList();
	menuListRefreshControl.endRefreshing();
});

var menuRefreshControl = Ti.UI.createRefreshControl({
	tintColor : "#FC3D39"
});

$.tableviewMenu.refreshControl = menuRefreshControl;

menuRefreshControl.addEventListener('refreshstart', function(e) {
	GetReadOnlyMenu();
	menuRefreshControl.endRefreshing();
});

function setMenusMoveable() {
	Ti.API.info($.tableviewMenuList.moving);
	if ($.tableviewMenuList.moving) {
		ReorderMenuText();
		$.tableviewMenuList.moving = false;
		$.buttonEditMenu.title = 'Edit';
	} else {
		$.buttonEditMenu.title = 'Done';
		$.tableviewMenuList.moving = true;
	}
	$.buttonEditMenu.width = Ti.UI.SIZE;
}

// function openMenuGroups() {
// var menugroups = Alloy.createController('menugroups', {
// parentWin : parentWin,
// oMenu : oMenu
// //NavBarTitle : args.NavBarTitle,
// });
// parentWin.openWindow(menugroups.getView());
// }

function openMenuGroup(e) {
	var menugroup = Alloy.createController('menugroup', {
		NavBarTitle : oMenu.Name,
		parentWin : parentWin,
		oMenu : oMenu
	}).getView();
	menugroup.open({
		modal : true,
		animated : true,
		//modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
	});
}

function addMenu() {
	openAddGeneric1('Add Menu', 'menus.getmenulist', 'menu', 0, 0, 0);
}

function editMenu() {
	openAddGeneric1(oMenu.Name, 'menus.getmenulist', 'menu', oMenu.MenuId, 0, 0, oMenu);
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

function ReorderMenuText() {
	//showLoading();
	var IdList = '';
	var tableSection = $.tableviewMenuList.data[0];
	for (var j = 0; j < tableSection.rowCount; j++) {
		var row = tableSection.rows[j];
		IdList += row.data.MenuId + ',';
	}

	var oArgs = {
		MenuId : 0,
		MenuTextTypeCode : 'menu',
		IdList : IdList,
		Callback : 'menus.reordermenu_success',
		ErrorCallback : 'menus.reordermenu_error'
	};
	lib_menu.ReorderMenuText(oArgs);
}

function GetMenuList() {
	//showLoading();
	var oArgs = {
		Callback : 'menus.getmenus_success',
		ErrorCallback : 'menus.getmenus_error'
	};
	lib_menu.GetMenuList(oArgs);
}

function GetReadOnlyMenu(MenuId) {
	//showLoading();
	setMenuData();
	var oArgs = {
		MenuId : oMenu.MenuId,
		Callback : 'menus.getreadonlymenu_success',
		ErrorCallback : 'menus.getreadonlymenu_error'
	};
	lib_menu.GetReadOnlyMenu(oArgs);
}

function loadMenuListData() {
	if (aMenuList.length > 0) {
		var data = [], args = {};
		_.each(aMenuList, function(oData) {
			//Ti.API.info(oData);
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
		$.tableviewMenuList.editable = false;
		$.tableviewMenuList.setData(data);
		//$.tab.setBadge(3);

		oMenu = $.tableviewMenuList.data[0].rows[0].data;
		GetReadOnlyMenu();
	} else {
		$.tableviewMenu.setData([]);
		$.tableviewMenuList.setData([]);
	}
}

function loadMenuData() {
	if (aMenu.length > 0) {
		var data = [], args = {};
		_.each(aMenu, function(oData) {
			//Ti.API.info(oData);
			args = {
				oData : oData
			};
			var row = Alloy.createController(oData.Controller, args).getView();
			row.data = oData;
			//row.title = oData.Val;
			//row.hasChild = true;
			data.push(row);
		});
		//$.tableviewMenu.editable = true;
		$.tableviewMenu.setData(data);
		//$.tab.setBadge(3);
	} else {
		$.tableviewMenu.setData([]);
	}
}

function getmenus_success(e) {
	//Ti.API.info(e);
	//hideLoading();
	aMenuList = e.oData.aMenuList;
	loadMenuListData();
}

function getmenus_error(e) {
	Ti.API.info(e);
	//hideLoading();
}

function getreadonlymenu_success(e) {
	Ti.API.info(e);
	//hideLoading();
	aMenu = e.oData.aMenuList;
	loadMenuData();
}

function getreadonlymenu_error(e) {
	Ti.API.info(e);
	//hideLoading();
}

function reordermenu_success(e) {
	Ti.API.info(e);
	//GetMenuList();
	//hideLoading();
}

function reordermenu_error(e) {
	Ti.API.info(e);
	//hideLoading();
}

$.tableviewMenuList.addEventListener('click', function(e) {
	Ti.API.info('e.row');
	Ti.API.info(e.detail);
	oMenu = e.row.data || {};
	GetReadOnlyMenu();
});

function setMenuData() {
	$.buttonMenuLabel.title = oMenu.Name;
}

function initController() {
	// LocationId = Ti.App.Properties.getString('LocationId');
	//GetMenuList();
}

$.win.addEventListener('close', function() {
	Ti.App.removeEventListener('menus.initcontroller', initController);
	Ti.App.removeEventListener('menus.getmenus_success', getmenus_success);
	Ti.App.removeEventListener('menus.getmenus_error', getmenus_error);
	Ti.App.removeEventListener('menus.getreadonlymenu_success', getreadonlymenu_success);
	Ti.App.removeEventListener('menus.getreadonlymenu_error', getreadonlymenu_error);
	Ti.App.removeEventListener('menus.reordermenu_success', reordermenu_success);
	Ti.App.removeEventListener('menus.reordermenu_error', reordermenu_error);
	Ti.App.removeEventListener('menus.getmenulist', GetMenuList);
});

$.win.addEventListener('open', function() {
	Ti.App.addEventListener('menus.initcontroller', initController);
	Ti.App.addEventListener('menus.getmenus_success', getmenus_success);
	Ti.App.addEventListener('menus.getmenus_error', getmenus_error);
	Ti.App.addEventListener('menus.getreadonlymenu_success', getreadonlymenu_success);
	Ti.App.addEventListener('menus.getreadonlymenu_error', getreadonlymenu_error);
	Ti.App.addEventListener('menus.reordermenu_success', reordermenu_success);
	Ti.App.addEventListener('menus.reordermenu_error', reordermenu_error);
	Ti.App.addEventListener('menus.getmenulist', GetMenuList);
	initController();
});
