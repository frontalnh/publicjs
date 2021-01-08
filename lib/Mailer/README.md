# 아마존 SES 를 통한 간편한 이메일 전송 라이브러리

이메일을 보낼때 많은 기능들이 있지만 아주 심플한 기능만 구현된 가벼운 라이브러리를 만들어서 많은 분들이 목적에 맞게 커스텀해서 사용 할 수 있기를 바랍니다.

지금은 매우 간단한 기능만 있지만 필요한 기능이 있으시면 알려주시면 계속 업데이트해 나가겠습니다.

현업에서 필요한 간단한 기능만 구현하는 것이 목적이었습니다.

더 필요하고 또 많은 사람들이 자주 쓰는 기능이 있다면 알려주시면 계속 업데이트 해 나갈게요:)

또 혼자만 사용하던 기능들이 있다면 댓글이나 깃헙에 PR 남겨주시면 바로 반영하겠습니다

## Usage

HTML 이메일 보내기

```js
const sesHelper = new SESHelper({ region: 'ap-northeast-2' })
await sesHelper.sendHtml({
  from: 'frontalnh@gmail.com',
  toAddresses: ['frontalnh@gmail.com'],
  subject: '안녕하세요',
  html: `<h1>안녕하세요</h1>`
})
```
