const responseMsg = ({
  status = 'success',
  message = '',
  data = [],
} = {}) => ({
  status: [
    'success',
    'error',
  ].includes(status.toLocaleLowerCase()) ? status : 'success',
  message: typeof message === 'string' ? message : '',
  data: Array.isArray(data) ? data : [data],
})

module.exports = responseMsg
