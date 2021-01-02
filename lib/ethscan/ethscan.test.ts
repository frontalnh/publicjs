import { EthScan } from "./ethscan"

const ethscan = new EthScan('PRODUCTION')

describe('Ethscan', () => {

  it('Get decimals', async () => {
    const WETHADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

    const decimals = await ethscan.getDecimals(WETHADDRESS)
    expect(decimals).toBe(18)
  })

  it('Get symbol', async () => {
    const WETHADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

    const symbol = await ethscan.getSymbol(WETHADDRESS)
    expect(symbol).toBe('WETH')
  })

})
