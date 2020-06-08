import Toast from "./toast";
/**
 * Get host from UI
 */

const getSecure = (host) => {
  const hasSecure = host.indexOf("s/");
  return hasSecure != -1 ? true : false;
};

const getPort = (host) => {
  const positionPort = host.indexOf(":");
  let port = 8080; //default

  if (positionPort != -1) {
    port = Number(host.slice(positionPort + 1));
  }
  return { port, positionPort };
};

const getHost = (host) => {
  if (host == null || host == "") {
    Toast("Error Host", "#C11B17");
    throw "Without HOST";
  }

  const { port, positionPort } = getPort(host);
  const secure = getSecure(host); 
  
  return {
    host: secure ? host.slice(2, positionPort) : host.slice(0, positionPort),
    port: port,
    ssl: secure,
  };
};

module.exports = getHost;
