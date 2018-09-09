

export const actionTypesFor = (action, entity) => {
  return {
    load: `${action}/${entity}/PENDING`,
    success: `${action}/${entity}/SUCCESS`,
    failure: `${action}/${entity}/FAILURE`
  }
}
