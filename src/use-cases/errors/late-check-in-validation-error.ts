export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      'A check-in can only be validated up to 20 minutes after its creation',
    )
  }
}
