import { GMailer } from './Gmailer'

const gmailer = new GMailer({
  email: 'frontalnh@gmail.com',
  password: 'xlzbhdurhtderlim'
})
describe('Gmailer', () => {
  it('Send html', async () => {
    await gmailer.sendHtml({
      from: 'frontalnh@gmail.com',
      toAddresses: ['frontalnh@gmail.com'],
      subject: '안녕하세요',
      replyToAddresses: ['frontalnh@gmail.com'],
      html: `<h1>안녕하세요?</h1>`
    })
  })

  it('Send text', async () => {
    await gmailer.sendText({
      from: 'frontalnh@gmail.com',
      toAddresses: ['frontalnh@gmail.com'],
      subject: '안녕하세요',
      replyToAddresses: ['frontalnh@gmail.com'],
      text: `<h1>안녕하세요?</h1>`
    })
  })
})