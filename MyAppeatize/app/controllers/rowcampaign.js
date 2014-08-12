var args = arguments[0] || {}, RowData = args.oData;
Ti.API.info(args);

var TimeSend = moment(RowData.TimeSend).format('hh:mm A');
var DtEffective = moment(RowData.DtEffective).format('MM/DD/YYYY');
$.labelCampaignName.text = RowData.CampaignName;
$.labelDtEffective.text = 'Starts on ' + DtEffective;
$.labelTimeSend.text = 'Runs at ' + TimeSend;
$.labelRepeatText.text = 'Repeats ' + RowData.RepeatText;
$.labelCampaignHeader.text = RowData.CampaignHeader;

function doCampaignDetails() {
	Ti.App.fireEvent('campaigns.openaddcampaign', {
		CampaignId : RowData.CampaignId
	});
}
