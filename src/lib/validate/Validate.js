import { ERROR_CHECK_LIST_TYPE } from './ListError'

export const Validate = (
  type = 'email',
  inputValue,
  listError = {},
  price,
  priceSale,
  timeStart,
  timeEnd
) => {
  let error = null
  const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  const today = new Date()
  console.log('price', timeStart)
  console.log('inputValue', timeEnd)
  for (let key in listError) {
    switch (key) {
      case 'required':
        error = !inputValue ? ERROR_CHECK_LIST_TYPE[key] : null
        break
      case 'minLength':
        error =
          inputValue.length < +listError[key]
            ? ERROR_CHECK_LIST_TYPE[key] + listError[key] + ' kí tự'
            : null
        break
      case 'maxLength':
        error =
          inputValue.length > +listError[key]
            ? ERROR_CHECK_LIST_TYPE[key] + listError[key] + ' kí tự'
            : null
        break
      case 'regEmail':
        error = !reg.test(inputValue) ? ERROR_CHECK_LIST_TYPE[key] : null
        break
      case 'checkNumber':
        error = isNaN(inputValue) ? ERROR_CHECK_LIST_TYPE[key] : ''
        break
      case 'checkDate':
        error =
          new Date(inputValue) <= today ? ERROR_CHECK_LIST_TYPE[key] : null
        break
      case 'checkPrice':
        error = priceSale >= price ? ERROR_CHECK_LIST_TYPE[key] : null
        break
      case 'checkNegative':
        error = inputValue <= 0 ? ERROR_CHECK_LIST_TYPE[key] : null
        break
      case 'checkTimeEnd':
        error =
          new Date(timeStart) > new Date(inputValue)
            ? ERROR_CHECK_LIST_TYPE[key]
            : null
        break
      default:
    }

    if (error) {
      break
    }
  }
  return error
}
