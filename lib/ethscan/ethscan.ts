const JSSoup = require('jssoup').default
import Axios from 'axios'

export const ETHSCAN_ENDPOINT = {
  KOVAN: 'https://kovan.etherscan.io',
  PRODUCTION: 'https://etherscan.io'
}

export class EthScan {
  private endpoint

  constructor(
    public environment: keyof typeof ETHSCAN_ENDPOINT
  ) {
    this.endpoint = ETHSCAN_ENDPOINT[environment]
  }

  async getDecimals(tokenAddress: string): Promise<number> {
    const res = await Axios({
      method: 'GET',
      url: `${this.endpoint}/token/${tokenAddress}`,
    })
    const soup = new JSSoup(res.data)
    const elem = soup.find('div', { id: 'ContentPlaceHolder1_trDecimals' })

    const decimals = parseInt(elem.contents[0].contents[1].contents[0]._text.trim(), 10)
    return decimals
  }

  async getSymbol(tokenAddress: string): Promise<string> {
    const res = await Axios({
      method: 'GET', url: `${this.endpoint}/token/${tokenAddress}`,
    })
    const soup = new JSSoup(res.data)
    const head = soup.find('head')
    const symbol = head.nextElement.nextElement._text.match(/\(.*.\)/)[0].slice(1, -1)

    return symbol
  }
}
