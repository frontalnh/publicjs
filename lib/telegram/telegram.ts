import { MTProto } from '@mtproto/core';
import { waitFor } from '../misc';

export class Telegram {
  private mtproto: MTProto
  private phoneCodeHash: string
  private dc: number

  constructor(props: { apiId: number, apiHash: string, test: boolean }) {
    const { apiId: api_id, apiHash: api_hash, test } = props
    this.mtproto = new MTProto({
      api_id: Number(api_id),
      api_hash,
      test,
    })
  }

  public async setUpUserDc() {
    const { this_dc } = await this.getUserDc()
    this.dc = this_dc
  }

  public async getUserDc() {
    const { country, this_dc, nearest_dc } = await this.call('help.getNearestDc', {}) as any
    return { country, this_dc, nearest_dc }
  }

  public async call(method: string, payload: any, options?: { dcId: number }) {
    try {
      const result = await this.mtproto.call(method, payload, options)

      return result
    } catch (err) {
      // { _: 'mt_rpc_error', error_code: 420, error_message: 'FLOOD_WAIT_408' }
      if (err.error_code == 420) {
        const waitSec = Number((err.error_message as string).split('_').pop())
        console.log(`Telegram server flooded... Wait For: ${waitSec} seconds...`)
        await waitFor((waitSec + 5) * 1000)
        return this.call(method, payload, options)
      } else if (err.error_code == 500) { // { _: 'mt_rpc_error', error_code: 500, error_message: 'RPC_CALL_FAIL' }
        console.log(`Telegram server down... Wait For: 10 min...`)
        await waitFor(10 * 60 * 1000)
        return this.call(method, payload, options)
      }
      else {
        throw err
      }
    }
  }

  /**
   * 사용자의 핸드폰으로 코드를 보내서 입력을 하게 한다.
   */
  public async sendCode(phone: string, retryCount = 0) {
    if (retryCount > 2) { return }
    try {
      const { phone_code_hash }: any = await this.mtproto.call(
        'auth.sendCode',
        {
          phone_number: phone,
          settings: {
            _: 'codeSettings',
          },
        },
        { dcId: this.dc }
      )
      this.phoneCodeHash = phone_code_hash

      return { phone_code_hash }
    } catch (err) {
      console.log(err)
      // 사용자의 데이터센터가 가까운 곳으로 이전되었을때 일어나는 일이다.
      // 변경된 DC 로 현재 dc 를 바꾸어준다.
      if (err.error_code == 303) {
        // if PHONE_MIGRATE_5 => retry to 5
        // err.error_message => 'PHONE_MIGRATE_5'
        const newDc = err.error_message.split('_').pop()
        console.log('new Dc: ', newDc)
        this.dc = Number(newDc)
        return this.sendCode(phone, retryCount + 1)
      } else if (err.error_message == 'AUTH_RESTART') {
        // 이미 한번 인증을 한데서 다시 인증요청을 하면 이 에러가 뜬다.
        // 이때는 한번 더 시도해준다.
        return this.sendCode(phone, retryCount + 1)
      } else {
        throw err
      }
    }
  }

  public async signIn({ code, phone }) {
    return this.mtproto.call('auth.signIn', {
      phone_number: phone,
      phone_code: code,
      phone_code_hash: this.phoneCodeHash,
    }, { dcId: this.dc });
  }
  /**
   * 현재 해당 ID 에서 참여한 대화방의 목록을 받아온다.
   */
  public async getDialogs(
    channedId: string, accessHash: string, limit: number
  ) {
    const { chats, users, messages }: any = await this.mtproto.call('messages.getDialogs', {
      limit,
      exclude_pinned: true,
      offset_peer: {
        _: 'inputPeerChannel',
        channel_id: channedId,
        access_hash: accessHash
      },
    }, { dcId: 5 })

    return chats
  }

  public async getChatHistory(channel_id, access_hash, min_id) {

    const limit = 5

    const { messages }: any = await this.call('messages.getHistory', {
      peer: {
        _: 'inputPeerChannel',
        channel_id,
        access_hash
      },
      offset: -10,
      min_id,
      limit
    }, { dcId: 5 })

    return messages
  }
}
