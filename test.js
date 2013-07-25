var http = require("http"),
    downgradeIdentity = require("./");

downgradeIdentity.verbose = true;
downgradeIdentity.opts = require("optimist").argv;

console.log("initial process identity is %j/%j", process.getuid(), process.getgid());

var server =  http.createServer().on("listening", downgradeIdentity);
server.listen(80);

