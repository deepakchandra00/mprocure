const initialState = {  
  refineList: [],
  status: 'idle',
  error: {hasError: false, message: ''}
};
  
  
export default function getRefineList(state = initialState, action) {
  switch (action.type) {
    case "SET_REFINELIST":
      return {
        ...state,
        refineList: action.payload.refineList,
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}
  