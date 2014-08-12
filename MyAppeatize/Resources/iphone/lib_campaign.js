var svc_remote = require("svc_remote");

exports.GetCampaignByLoc = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    var LocationId = Ti.App.Properties.getString("LocationId") || 0;
    var Service = "campaign.cfc?method=GetCampaignByLoc&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        Xid: Xid,
        LocationId: LocationId
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
    svc_remote.doService(_args);
};

exports.GetCampaignDetail = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    var LocationId = Ti.App.Properties.getString("LocationId") || 0;
    var Service = "campaign.cfc?method=GetCampaignDetail&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        Xid: Xid,
        LocationId: LocationId,
        CampaignId: _args.CampaignId
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
    svc_remote.doService(_args);
};

exports.CommitCampaign = function(_args) {
    var Xid = Ti.App.Properties.getString("Xid");
    var LocationId = Ti.App.Properties.getString("LocationId") || 0;
    var Service = "campaign.cfc?method=CommitCampaign&ReturnFormat=json";
    var HttpMethod = "POST";
    var oServiceArgs = {
        Xid: Xid,
        LocationId: LocationId,
        CampaignId: _args.CampaignId,
        CampaignName: _args.CampaignName,
        RepeatText: _args.RepeatText,
        CampaignHeader: _args.CampaignHeader,
        CampaignText: _args.CampaignText,
        DayIdList: _args.DayIdList,
        TimeSend: _args.TimeSend,
        IsActive: _args.IsActive,
        DtEffective: _args.DtEffective
    };
    _args.oServiceArgs = oServiceArgs;
    _args.Service = Service;
    _args.HttpMethod = HttpMethod;
    _args.BaseServiceUrl = Alloy.CFG.SecureBaseUrl + Alloy.CFG.ServiceUrl;
    svc_remote.doService(_args);
};