import { SES } from 'aws-sdk'


export class SESHelper {
  public ses: SES

  constructor({
    region, apiVersion
  }: {
    region: string,
    apiVersion?: string
  }) {
    this.ses = new SES({
      apiVersion: apiVersion || '2010-12-01',
      region
    })
  }

  public async sendHtml(
    {
      from,
      toAddresses,
      replyToAddresses,
      subject, html
    }: {
      from: string,
      toAddresses: string[],
      replyToAddresses?: string[],
      subject: string,
      html: string
    }
  ) {
    await this.ses.sendEmail({
      Destination: {
        ToAddresses: toAddresses,
      },
      ReplyToAddresses: replyToAddresses || [from],
      Source: from,
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: html,
          },
        },
        Subject: { Charset: 'UTF-8', Data: subject },

      },
    }).promise()
  }

  public async sendText({
    from, toAddresses, replyToAddresses,
    subject, text
  }: {
    from: string,
    toAddresses: string[],
    replyToAddresses?: string[],
    subject: string,
    text: string
  }) {
    await this.ses.sendEmail({
      Destination: {
        ToAddresses: toAddresses,
      },
      ReplyToAddresses: replyToAddresses || [from],
      Source: from,
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: text,
          },
        },
        Subject: { Charset: 'UTF-8', Data: subject },

      },
    }).promise()
  }
}