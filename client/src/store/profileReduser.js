const SET_USER_PROFILE_INFO = 'SET_USER_PROFILE_INFO';
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

export const setUserProfileInfo = (profileInfo) => ({ type: SET_USER_PROFILE_INFO, profileInfo });
