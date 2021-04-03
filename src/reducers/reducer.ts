import { actions } from "../actions/constants";

const initialState: {} = {};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.DEFAULT_ACTION:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
export default reducer;
