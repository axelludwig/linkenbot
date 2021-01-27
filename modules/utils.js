
var fs = require('fs');
const path = require("path");

(function () {
    module.exports.getTextChannel = function () {
        var textChannel = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config')));
        textChannel = textChannel.textChannel
        textChannel = formatText(textChannel)
        return textChannel;
    }


    module.exports.formatText = function (text) {
        return formatText(text)
    }
}());

function formatText(text) {
    return text.replace(/\W/g, '');
}