import createSSHTunnel from ".";
import fs from "fs";

describe("test createSSHTunnel", () => {
  it("create tunnel", async () => {
    const localHost = "127.0.0.1";
    const localPort = 3307;
    const dstPort = 3306;
    const dstHost = "데이터베이스 호스트";
    const privateKey = fs.readFileSync("인증키 파일위치");
    const sshHost = "SSH 터널링 호스트";

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
