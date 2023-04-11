import UserTypes from "./userTypes";

const INITIAL_STATE = {
  iconrender: true,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.CHANGE_COMPONENT:
      return {
        ...state,
        iconrender: false,
      };
    default:
      return state;
  }
};

export default userReducer;
