import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { UpdateProfileForm } from './updateProfileForm';
import avatar from '../../../assets/img/nullAvatar.png';
import '../profile.css';
import FavoritePokemonsFeed from './FavoritePokemonsFeed';

const ProfileInfo = () => {
  const profileInfo = useSelector((state) => state.profilePage.profileInfo);

  const [editProfile, setEditProfile] = useState(false);
  return (
    <div className="wrapper">
      {editProfile ? <UpdateProfileForm setEditProfile={setEditProfile} /> : (
        <div>
          {profileInfo.map((p) => (
            <div key={p.id} className="content">
              <div className="profile">
                <div className="container">
                  <div className="profile__row">
                    <div className="avatar_button_block">
                      <div>
                        <img className="profile__avatar" src={avatar} />
                      </div>
                      <div className="profile__button">
                        <Button onClick={() => setEditProfile(true)}> Edit Profile</Button>
                      </div>
                    </div>
                    <div className="profile_info">
                      <div>{p.name}</div>
                      <div>{p.age}</div>
                      <div>{p.aboutMe}</div>
                      <div>{p.email}</div>
                      <div>{p.instagram}</div>
                    </div>
                  </div>
                </div>
              </div>
              <FavoritePokemonsFeed />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
export default ProfileInfo;
