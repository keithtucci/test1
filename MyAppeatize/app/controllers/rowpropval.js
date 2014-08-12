var args = arguments[0] || {};

$.labelProp.text = args.oData.Prop;

if (args.oData.HasChild == 1) {
	$.imageviewRightArrow.visible = true;
	$.labelProp.right = 40;
}

if (args.oData.Icon != '') {
	$.imageviewIcon.image = '/images/' + args.oData.Icon;
}