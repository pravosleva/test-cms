import { compose, withStateHandlers, withHandlers } from 'recompose';


export default compose(
  withStateHandlers((
    initialState = {
      users: null // Will be set as Array
    }) => ({
      users: initialState.users
    }),
    {
      setFieldValue: prevState => (fieldName, value) => ({
        ...prevState,
        [fieldName]: value
      }),
    }
  ),
  withHandlers({
    getUsersByRole: props => async role => {
      const response = await fetch('/users')
        .then(res => res.json())
        .catch(err => console.log(err));

      props.setFieldValue('users', [...response].filter(u => u.companyrole === role));
    }
  }),
);
