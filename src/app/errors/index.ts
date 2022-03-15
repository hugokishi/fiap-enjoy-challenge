interface IError {
  code: string;
  status?: number;
  message?: string;
}

const errors: IError[] = [
  {
    code: '1001',
    status: 500
  },
  {
    code: '400',
    status: 400,
    message: 'Bad request'
  },
  {
    code: '401',
    status: 401,
    message: '401 Unauthorized'
  }
]

export default errors
