interface Mailer {
  sendHtml({
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
  }): Promise<void>

  sendText({
    from, toAddresses, replyToAddresses,
    subject, text
  }: {
    from: string,
    toAddresses: string[],
    replyToAddresses?: string[],
    subject: string,
    text: string
  }): Promise<void>
}