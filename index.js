// flexible logic to downgrade identity, e.g. in a listening callback

function downgradeIdentity(uid, gid)
{
  if (!uid) uid = (exports.opts && (exports.opts.setuid || exports.opts.uid || exports.opts.user)) || process.env.npm_config_setuid || process.env.SUDO_UID || process.env.SUDO_USER || process.env.npm_package_config_user;
  if (!gid) gid = (exports.opts && (exports.opts.setgid || exports.opts.gid || exports.opts.group)) || process.env.npm_config_setgid || process.env.SUDO_GID || process.env.npm_package_config_group;
  // numerical ids have to be passed as numbers
  if (uid && /^\d+$/.test(uid)) uid = parseInt(uid);
  if (gid && /^\d+$/.test(gid)) gid = parseInt(gid);
  if (uid || gid) {
      try {
          // NOTE: we call setgid first, since we will likely lose setgid permission after the setuid
          if (gid && gid != process.getgid()) process.setgid(gid);
          if (uid && uid != process.getuid()) process.setuid(uid);
      } catch (err) {
          exports.logger.error("failed to downgrade identity", err);
      }
    if (exports.verbose) exports.logger.info("process identity downgraded to %d/%d", process.getuid(), process.getgid());
  } else {
    exports.logger.warn("no new identity found");
  }
}

exports = module.exports = downgradeIdentity;

exports.verbose = false;
exports.logger = console;
exports.opts = null;
