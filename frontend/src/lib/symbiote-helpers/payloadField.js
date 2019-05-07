const payloadField = (field, obj) => (state, payload) => {
  console.log(payload);

  return ({
    ...state,
    ...obj,
    [field]: payload
  });
};

export default payloadField;
