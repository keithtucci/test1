var alertDialog = Titanium.UI.createAlertDialog({
	buttonNames : ['OK'],
	title : ''
});

exports.doService = function(_args) {
	try {
		Ti.API.info(_args);
		var xhr = Ti.Network.createHTTPClient();
		xhr.setTimeout(300000);
		var url = _args.BaseServiceUrl + _args.Service;
		xhr.open(_args.HttpMethod, url);
		//xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8;');
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		var oArgs = _args.oServiceArgs;
		var Message;
		xhr.onload = function() {
			//Ti.API.info(this.responseText);
			//alert(this.responseText);
			var oResp = JSON.parse(this.responseText);
			//Ti.API.info(oResp);
			if (oResp.Message != null && oResp.Message.length > 0) {
				Message = oResp.Message;
			}
			if (oResp.Acknowledge != null && oResp.Acknowledge == 1) {
				if (_args.Callback != null) {
					Ti.App.fireEvent(_args.Callback, {
						oData : oResp
					});
				}
			} else {
				ErrorLevel = 89;
				if (Message == null) {
					Message = Alloy.CFG.ErrorMessage;
				}
				Ti.API.info(oResp);
				if (oResp.Message != null && oResp.Message.length > 0) {
					//if (ENV_DEV) {
					alertDialog.title = '';
					alertDialog.message = oResp.Message;
					alertDialog.show();
					//}
				}
				if (_args.ErrorCallback != null) {
					Ti.App.fireEvent(_args.ErrorCallback, {
						ErrorLevel : ErrorLevel,
						Message : Message
					});
				}
			}
		};
		xhr.onerror = function(e) {
			ErrorLevel = 98;
			Ti.API.info(JSON.stringify(e));
			Ti.API.info(_args.Service);
			Message = Alloy.CFG.ErrorMessage;
			FullMessage = e.error;
			//if (ENV_DEV) {
				alertDialog.title = 'Communication Error';
				alertDialog.message = Message;
				alertDialog.show();
			//}
			Ti.App.fireEvent(_args.ErrorCallback, {
				ErrorLevel : ErrorLevel
			});
		};
		Ti.API.info(oArgs);
		xhr.send(oArgs);
		//xhr.send(JSON.stringify(oArgs));
	} catch(e) {
		ErrorLevel = 99;
		Ti.API.info(JSON.stringify(e));
		Message = Alloy.CFG.ErrorMessage;
		FullMessage = e.error;
		//if (ENV_DEV) {
			alertDialog.title = 'Communication Error';
			alertDialog.message = Message;
			alertDialog.show();
		//}
		Ti.App.fireEvent(_args.ErrorCallback, {
			ErrorLevel : ErrorLevel
		});
	}
};

