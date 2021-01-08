import { SESMailer } from "./SESMailer";

const sesHelper = new SESMailer({ region: 'ap-northeast-2' })

describe('test mailer', () => {
  it('send html', async () => {
    await sesHelper.sendHtml({
      from: 'frontalnh@gmail.com',
      toAddresses: ['frontalnh@gmail.com'],
      subject: '안녕하세요',
      html: `<h1>안녕하세요</h1>`
    })
  });

  it('send text', async () => {
    await sesHelper.sendText({
      from: 'frontalnh@gmail.com',
      toAddresses: ['frontalnh@gmail.com'],
      subject: '안녕하세요',
      text: `안녕하세요`
    })
  });
});
