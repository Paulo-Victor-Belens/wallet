import userInfos from '../actions-types/actions-types-user';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case userInfos.USER_EMAIL:
    return {
      ...state,
      email: action.payload,
    };

  default:
    return { ...state };
  }
};

export default userReducer;
