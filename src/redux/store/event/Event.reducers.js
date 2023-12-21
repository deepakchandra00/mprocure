const initialState = {
  authDetail: [],
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        authDetail: action.payload,
      };
    default:
      return state;
  }
}
