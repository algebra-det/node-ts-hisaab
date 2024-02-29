class ErrorResponse extends Error {
  statusCode: number
  data: object | null
  message: string
  success: false
  errors: any

  constructor(
    statusCode = 500,
    message = 'Something went wrong',
    data = null,
    errors = [],
    stack = ''
  ) {
    console.log('message 1: ', message);
    super(message)
    
    this.statusCode = statusCode
    this.data = data
    this.message = message
    this.success = false
    this.errors = errors
    console.log('message 2: ', this.message);

    if (stack) this.stack = stack
    else Error.captureStackTrace(this, this.constructor)
  }
}

export default ErrorResponse
