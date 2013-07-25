# downgrade-identity

This module implements a single, flexible method for downgrading process identity,
e.g. after listening to a privileged port.  Out of the box it supports user/group
identity specified via npm command line arguments or via the standard `SUDO_` environment
variables, or it can be provide a custom options object.


## Install

```bash
    npm install downgrade-identity
```

## Usage

Following examples all assume a `server.js` like this:

```javascript
var http = require("http"),
    argv = require("optimist").argv,
    downgradeIdentity = require("downgrade-identity");

downgradeIdentity.verbose = true;

var server =  http.createServer().on("listening", downgradeIdentity);
server.listen(80);
```

### no args

Won't work because I'm not a privileged user.

```bash
% node test.js
initial process identity is 113/113

events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: listen EACCES
```

# sudo

Will downgrade to identity pulled from `SUDO_` environment variables.

```bash
% sudo env | grep SUDO
SUDO_COMMAND=/usr/bin/env
SUDO_USER=femto113
SUDO_UID=113
SUDO_GID=113
% sudo node test.js
initial process identity is 0/0
process identity downgraded to 113/113
    
```

### npm command line

Will downgrade to specified identity pulled from `npm_config_` environment variables.

```bash
% sudo npm start --setuid=113 --setgid=113

> node-downgrade-identity@0.1.0 start /home/femto113/node-downgrade-identity
> node server.js

initial process identity is 0/0
process identity downgraded to 113/113
```

### optimist command line

Downgrade to specified identity provided via `opts` export.

```bash
% sudo node server.js --setuid 113 --setgid 113  
% sudo node server.js --setuid 113 --setgid 113
initial process identity is 0/0
process identity downgraded to 113/113
```
