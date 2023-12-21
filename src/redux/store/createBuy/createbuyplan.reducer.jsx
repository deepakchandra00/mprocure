const initialState = {  
  create_buy_plans: [],
  status: 'idle',
  error: {hasError: false, message: ''}
};
  
  
export default function createBuyPlan(state = initialState, action) {
  switch (action.type) {
    case "SET_CREATE_BUY_PLAN":
      return {
        ...state,
        create_buy_plans: action.payload.create_buy_plans,
        status: action.payload.status,
        error: action.payload.error
      };
    default:
      return state;
  }
}
  