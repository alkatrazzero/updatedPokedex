import { SET_USER_DATA, SET_USER_TOKEN } from '../constants';

export const setUserToken = (token) => ({ type: SET_USER_TOKEN, token });
export const setUserData = (userData) => ({ type: SET_USER_DATA, userData });
