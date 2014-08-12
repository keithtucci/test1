var lib_common = require('lib_common');

var alertDialog = Titanium.UI.createAlertDialog({
	buttonNames : ['OK'],
	title : ''
});

var AccessToken = lib_common.getAccessToken();

exports.getExec = function(_args) {
	try {
		Ti.API.info('getExec');
		var xhr = Ti.Network.createHTTPClient();
		xhr.setTimeout(60000);
		Ti.API.info(Alloy.CFG.ServiceUrl);
		var url = Alloy.CFG.ServiceUrl + 'exec.cfc?method=getExec&ReturnFormat=json';
		xhr.open('GET', url);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8;');
		var oArgs = {
			'Xid' : AccessToken
		};				
		xhr.onload = function() {
			Ti.API.info(this.responseText);
			var oResp = JSON.parse(this.responseText);
			if(oResp.oMessage.MESSAGETYPE == 'success'){
				var qSum1 = lib_common.parseCFJSON(oResp.qSum1);
				var qSum1Detail = lib_common.parseCFJSON(qSum1[0].QRESULT);
				var qSum2 = lib_common.parseCFJSON(oResp.qSum2);
				var qSum2Detail = lib_common.parseCFJSON(qSum2[0].QRESULT);
				var qSum3 = lib_common.parseCFJSON(oResp.qSum3);
				var qSum3Detail = lib_common.parseCFJSON(qSum3[0].QRESULT);
				var qSum4 = lib_common.parseCFJSON(oResp.qSum4);
				var qSum4Detail = lib_common.parseCFJSON(qSum4[0].QRESULT);
				var qMap = lib_common.parseCFJSON(oResp.qMap);
				var qChart1 = lib_common.parseCFJSON(oResp.qChart1);
				var qChart2 = lib_common.parseCFJSON(oResp.qChart2);
				var qChart3 = lib_common.parseCFJSON(oResp.qChart3);
				var RefreshTime = oResp.RefreshTime;
	
				Ti.App.fireEvent('svc_exec.getExec', {
					oSum1 : qSum1[0],
					qSum1Detail : qSum1Detail,
					oSum2 : qSum2[0],
					qSum2Detail : qSum2Detail,
					oSum3 : qSum3[0],
					qSum3Detail : qSum3Detail,
					oSum4 : qSum4[0],
					qSum4Detail : qSum4Detail,
					qMap : qMap,
					qChart1 : qChart1,
					RefreshTime : RefreshTime
				});
			}
			else{
				Ti.App.fireEvent('svc_exec.getExec.Error', {
					Message : oResp.oMessage.MESSAGE
				});
			}
			Ti.App.fireEvent('hideIndicator');
		};
		xhr.onerror = function(e) {
			Ti.API.info(e.error);
			//alertDialog.message = Alloy.CFG.ErrorMessage;
			//alertDialog.show();
			Ti.App.fireEvent('svc_exec.getExec.Error', {
				Message : 'An error has occurrred, please try again...'
			});
			Ti.App.fireEvent('hideIndicator');
		};
		Ti.API.info(oArgs);
		xhr.send(oArgs);
	} catch(e) {
		Ti.API.info(JSON.stringify(e));
		//alertDialog.message = Alloy.CFG.ErrorMessage;
		//alertDialog.show();
		Ti.App.fireEvent('svc_exec.getToday.getExec.Error', {
			Message : 'An error has occurrred, please try again...'
		});
		Ti.App.fireEvent('hideIndicator');
	}
};
