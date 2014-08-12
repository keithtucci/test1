var NavigationWindow;

exports.createNavigationWindow = function(args) {
    var navWin = Ti.UI.iOS.createNavigationWindow(args);
    args && args.id && (Alloy.Globals[args.id] = navWin);
    return navWin;
};

exports.createWindow = function(args) {
    return Ti.UI.createWindow(args);
};

exports.createTextArea = function(args) {
    var $textArea = Ti.UI.createTextArea(args);
    if (args.hintText) {
        $textArea.originalColor = $textArea.color || "#000";
        $textArea.value || $textArea.applyProperties({
            value: $textArea.hintText,
            color: "#ccc"
        });
        $textArea.addEventListener("focus", function(e) {
            e.source.value == e.source.hintText && e.source.applyProperties({
                value: "",
                color: e.source.originalColor
            });
        });
        $textArea.addEventListener("blur", function(e) {
            e.source.value || e.source.applyProperties({
                value: e.source.hintText,
                color: "#ccc"
            });
        });
    }
    return $textArea;
};