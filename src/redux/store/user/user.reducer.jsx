const initialState = {  
  userDetail: [],
  status: 'idle',
  error: {hasError: false, message: ''}
};
  
  
export default function getUser(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userDetail: action.payload.userDetail,
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}
  