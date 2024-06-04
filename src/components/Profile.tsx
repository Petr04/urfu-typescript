import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setToken } from '../reducers/userReducer';
import Header from './Header';
import { RootState } from '../store/store';
import '../styles.css';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>({});

  interface UserData {
    name?: string;
    email?: string;
    avatar?: string;
  }

  useEffect(() => {
    if (!user) {
      navigate('/register');
    } else {
      setFormData(user);
    }
  }, [user, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(formData));
    dispatch(setUser(formData));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate('/home');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile">
      <Header showSearch={false} showAuthButtons={false} setSearch={() => null} />
      <main>
        {isEditing ? (
          <>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="text"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            />
            <button onClick={handleSave}>Сохранить</button>
          </>
        ) : (
          <>
            <img src={user.avatar} alt={user.name} />
            <div>{user.name}</div>
            <div>{user.email}</div>
            <button onClick={handleEdit}>Редактировать</button>
          </>
        )}
        <button onClick={handleLogout}>Выход</button>
      </main>
    </div>
  );
};

export default Profile;
