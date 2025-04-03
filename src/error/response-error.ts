export class ResponseError extends Error {
  /**
   *Membuat response error secara custom
   */
  constructor(public status: number, public message: string) {
    super(message);
  }
}
