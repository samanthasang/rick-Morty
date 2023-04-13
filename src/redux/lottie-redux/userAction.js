import UserTypes from "./userTypes";

export const ChangeComponent = (changeValue) => {
  return {
    type: UserTypes.CHANGE_COMPONENT,
    payload: changeValue
  };
};

