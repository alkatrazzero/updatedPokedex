import { SET_USER_PROFILE_INFO } from './constants';

const initialState = {
  profileInfo: [],

};

export const profileReduser = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE_INFO:
      return {
        ...state, profileInfo: action.profileInfo,
      };
    default:
      return state;
  }
};
