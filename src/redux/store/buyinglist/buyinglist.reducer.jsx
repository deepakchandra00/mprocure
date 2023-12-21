const initialState = {  
  buyingList: [],
  status: 'idle',
  error: {hasError: false, message: ''}
};
  
  
export default function getBuyList(state = initialState, action) {
  switch (action.type) {
    case "SET_BUYINGLIST":
      return {
        ...state,
        buyingList: action.payload.buyingList,
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}
  