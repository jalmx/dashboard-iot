/**
 * Get host from UI
 */

const getHost = (host) => {
  if (host == null || host == "") {
    throw "Without HOST"
  }
  const positionPort = host.indexOf(":");
  let port = 8080;

  if (positionPort != -1) {
    port = Number(host.slice(positionPort + 1));
  }
  return {
    host: host.slice(0, positionPort),
    port: port,
  };
};

module.exports = getHost;
