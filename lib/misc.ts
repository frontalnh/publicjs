export class ErrorWithCode extends Error {
  constructor(
    public code: string,
    public msg: string,
    public status?: number
  ) {
    super(msg)
  }
}

export function waitFor(ms: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => { resolve() }, ms)
  })
}
