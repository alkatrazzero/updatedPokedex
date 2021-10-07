import React, { useEffect } from 'react';
import './profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { profileInfoAPI } from '../../api/api';
import { setUserProfileInfo } from '../../store/profileReduser';
import ProfileInfo from './profileInfo/profileInfo';

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(
    async () => {
      const profileInfo = await profileInfoAPI.getProfileInfo(token);
      dispatch(setUserProfileInfo(profileInfo));
      document.title = 'My profile';
    },
    [],
  );
  return (
    <div>
      <ProfileInfo />
    </div>
  );
};
export default Profile;
