import createSSHTunnel from ".";
import fs from "fs";

describe("test createSSHTunnel", () => {
  it("create tunnel", async () => {
    const localHost = "127.0.0.1";
    const localPort = 3307;
    const dstPort = 3306;
    const dstHost = "prod-gigscout-db-endpoint.cluster-custom-cq6qodluq8da.ap-northeast-2.rds.amazonaws.com";
    const privateKey = fs.readFileSync("/Users/namhoonlee/.ssh/prod-indinity.pem");
    const sshHost = "3.36.236.60";

    const tunnel = await createSSHTunnel({
      username: "ec2-user",
      keepAlive: true,
      privateKey,
      host: sshHost,
      port: 22,
      dstHost,
      dstPort,
      passphrase: "secret",
      localHost,
      localPort,
    });

    tunnel.close();
  });
});
