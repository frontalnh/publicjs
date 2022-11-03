import { Server } from "net";
import tunnel from "tunnel-ssh";

export default function createSSHTunnel(sshConfig: {
  username: string;
  keepAlive: true;
  privateKey: Buffer;
  host: string;
  port: number;
  dstHost: string;
  dstPort: number;
  passphrase: "secret";
  localHost: string;
  localPort: number;
}): Promise<Server> {
  return new Promise((resolve, reject) => {
    tunnel(sshConfig, (error, server) => {
      if (error) {
        reject(error);
      } else if (server !== null) {
        resolve(server);
      }
    });
  });
}
