/**
 * Created by deng on 16-8-12.
 */
var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
function HJ(roomid) {
    this.roomid = roomid;
    this.start()
}
HJ.prototype.start = function () {
    var request = require("request");

    var options = {
        method: 'GET',
        url: 'http://h.huajiao.com/l/index?liveid=' + this.roomid
    };
    request(options, function (error, response, body) {
        if (error) {
            return console.log(error.message);
        }
        ;
        try {
            var snreg = body.match("\"sn\":\"_LC_[a-z0-9A-Z]{2,3}_non_[0-9]{25}_[A-Z]{2}\",")[0].slice("\"sn\":".length).replace("\"", "").replace(",", "").replace("\"", "");
            var relateid = body.match("\"relateid\":[0-9]{5,12}")[0].slice("\"relateid\":".length);
            var uid = body.match("\"uid\":\"[0-9]{6,15}\"")[0].slice("\"uid\":".length).replace("\"", "").replace("\"", "");
            var exp = body.match("\"exp\":[0-9]{4,12}")[0].slice("\"exp\":".length);
            var level = body.match("\"level\":[0-9]{1,3}")[0].slice("\"level\":".length);
            var usign = body.match("\"usign\":\".{30,32}\"")[0].slice("\"usign\":".length).replace("\"", "").replace("\"", "");

            // console.log(snreg);
            // console.log(relateid);
            // console.log(uid);
            // console.log(exp);
            // console.log(level);
            // console.log(usign);
            var lc = "http://localhost:3000/hj?snreg=" + snreg +
                "&relateid=" + relateid + "&level=" + level + "&usign=" + usign +
                "&uid=" + uid + "&exp=" + exp + "";
            console.log(lc);
            var childArgs = [
                path.join(__dirname, 'loadspeed.js'),
                lc
            ];

            childProcess.execFile(binPath, childArgs, function (err, stdout, stderr) {
                // handle results
            });
        } catch (e) {
            console.log(e);
        }

    });


};

module.exports = HJ;
