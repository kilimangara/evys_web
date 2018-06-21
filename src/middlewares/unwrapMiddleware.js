export default store => next => action => {
  if (!action.payload) return next(action);
  if (action.payload.data) action.payload = action.payload.data;
  if (action.payload.error) action.payload = action.payload.error;
  return next(action);
};
