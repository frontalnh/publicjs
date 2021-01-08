import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import _ from 'lodash'

export class GMailer implements Mailer {
  constructor({ email, password }: {
    email: string,
    password: string
  }) {
    this.email = email
    this.password = password

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.email,
        pass: this.password // 비밀번호 혹은 2FA 사용자의 경우 토큰을 입력해주세요.
      }
    })
  }

  private email: string
  private password: string
  private transporter: Mail

  async sendHtml({ from, toAddresses, replyToAddresses, subject, html }: {
    from: string; toAddresses: string[]; replyToAddresses?: string[]; subject: string; html: string;
  }): Promise<void> {
    if (toAddresses.length !== 1) throw new Error('복수 이메일 전송은 지원하지 않습니다.')
    if (replyToAddresses.length !== 1) throw new Error('여러개의 답장 받는이 지정은 지원하지 않습니다.')

    await this.transporter.sendMail(_.pickBy({
      from,
      to: toAddresses[0],
      replyTo: replyToAddresses[0],
      subject, html
    }, _.identity))
  }

  public async sendText({ from, toAddresses, replyToAddresses, subject, text }: {
    from: string; toAddresses: string[]; replyToAddresses?: string[];
    subject: string; text: string;
  }): Promise<void> {
    if (toAddresses.length !== 1) throw new Error('복수 이메일 전송은 지원하지 않습니다.')
    if (replyToAddresses.length !== 1) throw new Error('여러개의 답장 받는이 지정은 지원하지 않습니다.')

    await this.transporter.sendMail(_.pickBy({
      from,
      to: toAddresses[0],
      replyTo: replyToAddresses[0],
      subject, text
    }, _.identity))
  }

}
