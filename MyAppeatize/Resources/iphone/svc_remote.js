var alertDialog = Titanium.UI.createAlertDialog({
    buttonNames: [ "OK" ],
    title: ""
});

exports.doService = function(_args) {
    try {
        Ti.API.info(_args);
        var xhr = Ti.Network.createHTTPClient();
        xhr.setTimeout(3e5);
        var url = _args.BaseServiceUrl + _args.Service;
        xhr.open(_args.HttpMethod, url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var oArgs = _args.oServiceArgs;
        var Message;
        xhr.onload = function() {
            var oResp = JSON.parse(this.responseText);
            null != oResp.Message && oResp.Message.length > 0 && (Message = oResp.Message);
            if (null != oResp.Acknowledge && 1 == oResp.Acknowledge) null != _args.Callback && Ti.App.fireEvent(_args.Callback, {
                oData: oResp
            }); else {
                ErrorLevel = 89;
                null == Message && (Message = Alloy.CFG.ErrorMessage);
                Ti.API.info(oResp);
                if (null != oResp.Message && oResp.Message.length > 0) {
                    alertDialog.title = "";
                    alertDialog.message = oResp.Message;
                    alertDialog.show();
                }
                null != _args.ErrorCallback && Ti.App.fireEvent(_args.ErrorCallback, {
                    ErrorLevel: ErrorLevel,
                    Message: Message
                });
            }
        };
        xhr.onerror = function(e) {
            ErrorLevel = 98;
            Ti.API.info(JSON.stringify(e));
            Ti.API.info(_args.Service);
            Message = Alloy.CFG.ErrorMessage;
            FullMessage = e.error;
            alertDialog.title = "Communication Error";
            alertDialog.message = Message;
            alertDialog.show();
            Ti.App.fireEvent(_args.ErrorCallback, {
                ErrorLevel: ErrorLevel
            });
        };
        Ti.API.info(oArgs);
        xhr.send(oArgs);
    } catch (e) {
        ErrorLevel = 99;
        Ti.API.info(JSON.stringify(e));
        Message = Alloy.CFG.ErrorMessage;
        FullMessage = e.error;
        alertDialog.title = "Communication Error";
        alertDialog.message = Message;
        alertDialog.show();
        Ti.App.fireEvent(_args.ErrorCallback, {
            ErrorLevel: ErrorLevel
        });
    }
};