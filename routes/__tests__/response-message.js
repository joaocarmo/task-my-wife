const responseMsg = require('../response-message')

describe('Examine the function that formats the server response', () => {
  it('should return an empty success message without arguments', () => {
    expect(responseMsg()).toEqual({
      status: 'success',
      message: '',
      data: [],
    })
  })
})

module.exports = responseMsg
