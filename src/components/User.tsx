import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const User = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ first_name: string, last_name: string, email: string }>({
    first_name: '',
    last_name: '',
    email: ''
  });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`)
      .then(response => setUser(response.data.data))
      .catch(error => console.log(error));
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
    if (user) {
      setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
    }
  };

  const handleSave = () => {
    axios.patch(`https://reqres.in/api/users/${id}`, formData)
      .then(response => {
        setUser(response.data);
        setIsEditing(false);
      })
      .catch(error => console.log(error));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-detail">
      {isEditing ? (
        <>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          />
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
          <input
            type="text"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <button onClick={handleSave}>Сохранить</button>
        </>
      ) : (
        <>
          <img src={user.avatar} alt={user.first_name} />
          <div>{user.first_name} {user.last_name}</div>
          <div>{user.email}</div>
          <button onClick={handleEdit}>Редактировать</button>
        </>
      )}
      <button onClick={() => navigate('/home')}>Назад</button>
    </div>
  );
};

export default User;
export type { IUser };
