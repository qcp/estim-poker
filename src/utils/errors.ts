export class ApiError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'ApiError'

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}
