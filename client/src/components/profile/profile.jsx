import React, { useEffect } from 'react';
import './profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { profileInfoAPI } from '../../api/api';
import { setUserProfileInfo } from '../../store/profileActions/profileActions';
import ProfileInfo from './profileInfo/profileInfo';
import { Preloader } from '../../assets/Preloader';
import { fetching } from '../../store/pokemonsActions/pokemonsActions';

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isFetching = useSelector((state) => state.pokemonsPage.fetching);
  useEffect(
    async () => {
      dispatch(fetching(true));
      const profileInfo = await profileInfoAPI.getProfileInfo(token);
      dispatch(fetching(false));
      dispatch(setUserProfileInfo(profileInfo));
      document.title = 'My profile';
    },
    [],
  );
  return (
    <div>
      {isFetching ? <div className="preloader"><Preloader /></div>
        : <ProfileInfo />}
    </div>
  );
};
export default Profile;
