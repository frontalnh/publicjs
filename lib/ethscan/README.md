# ETHSCAN 데이터 조회 라이브러리

이더리움 관련 프로젝트를 할때 특정 주소값의 DECIMAL 혹은 symbol 명을 알기가 꾀나 까다로운 일이었습니다.

이를 해결하기 위해 Ethscan 에서 특정 주소값을 통해 해당 토큰의 decimal 과 symbol 명을 조회하는 기능을 구현하였습니다.

본 라이브러리는 앞으로 이더스캔에서 다양한 정보를 조회함에 있어, 여러 기능을 추가할 예정이며,

필요한 기능이 있으시거나 혹은 과거에 만들어두신 내용이 있다면 댓글이나 참여하기에 남겨주시면 반영하도록 하겠습니다.

## USAGE

### 특정 주소 DECIMAL 조회

```ts
const ethscan = new EthScan('PRODUCTION')
const WETHADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

const decimals = await ethscan.getDecimals(WETHADDRESS)
```

### 주소의 SYMBOL 조회

```ts
const ethscan = new EthScan('PRODUCTION')
const WETHADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
const symbol = await ethscan.getSymbol(WETHADDRESS)
```
