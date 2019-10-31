const responseMsg = require('../response-message')

describe('Examine the function that formats the server response', () => {
  it('should return an empty success message without arguments', () => {
    expect(responseMsg()).toEqual({
      status: 'success',
      message: '',
      data: [],
    })
    expect(responseMsg({})).toEqual({
      status: 'success',
      message: '',
      data: [],
    })
  })
  it('should return an empty success message with invalid arguments', () => {
    expect(responseMsg('invalid')).toEqual({
      status: 'success',
      message: '',
      data: [],
    })
    expect(responseMsg({ key: 'isInvalidToo' })).toEqual({
      status: 'success',
      message: '',
      data: [],
    })
    expect(responseMsg({ status: 'isInvalidToo', message: 0 })).toEqual({
      status: 'success',
      message: '',
      data: [],
    })
  })
  it('should return an error message with the error/message arguments', () => {
    expect(responseMsg({ status: 'error' })).toEqual({
      status: 'error',
      message: '',
      data: [],
    })
    expect(responseMsg({ status: 'error', message: 'details' })).toEqual({
      status: 'error',
      message: 'details',
      data: [],
    })
  })
  it('should return a success message with data only', () => {
    expect(responseMsg({ data: [1, 2, 3] })).toEqual({
      status: 'success',
      message: '',
      data: [1, 2, 3],
    })
  })
})

module.exports = responseMsg
