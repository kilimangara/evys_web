

const getErrors = (errorsMap, field) => {
  if (!errorsMap) return
  const errors = errorsMap[field]
  if(errors == undefined) return errors
  if(errors instanceof Array) return errors.join(', ')
  return errors
}

export default getErrors
