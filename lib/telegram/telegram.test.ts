import { Telegram } from "./telegram"
const prompt = require('prompt-sync')()
jest.setTimeout(50000)

const telegram = new Telegram({
  apiId: 0, // Your api ID
  apiHash: 'YourApiHash',
  test: true
})

describe('Test Telegram Lib', () => {
  beforeAll(async () => {
    await telegram.setUpUserDc()
  })

  it('Test Get User DC', async () => {
    console.log(await telegram.getUserDc())
  })

  it('Test Send Code', async () => {
    await telegram.sendCode('+821042992920')
  })

  it('Test Sign In', async () => {
    await telegram.sendCode('+821042992920')
    const code = prompt('텔레그램에서 받은 코드를 입력해주세요')
    await telegram.signIn({ code, phone: '+821042992920' })
  })

  it('Test Get User Dialogs', async () => {
    const chats = await telegram.getDialogs('', '', 50)

    console.log(chats.filter(chat => chat.title == 'Automated Trading Signals')[0])
  })

  it('Test Get Channel Messages', async () => {
    const chats = await telegram.getDialogs('', '', 50)
    const chat = chats.filter(chat => chat.title == 'Automated Trading Signals')[0]
    console.log(chat)
    const { id, access_hash } = chat
    const result = await telegram.getChatHistory(id, access_hash, 0)
    console.log(result.map(chat => chat.message.split('\n').join('')))
  })
})
