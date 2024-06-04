import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../reducers/userReducer';
import Header from './Header';
import '../styles.css';

const Register = () => {
  const [formData, setFormData] = useState<{ name: string, email: string, password: string, avatar: string }>({ name: '', email: '', password: '', avatar: '' });
  const [error, setError] = useState<string | null>(null); // Для отображения ошибок
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = () => {
    const { email, password } = formData;

    axios.post('https://reqres.in/api/register', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(formData));
        dispatch(setToken(response.data.token));
        dispatch(setUser(formData));
        navigate('/profile');
      })
      .catch(error => {
        console.log(error);
        setError('Ошибка регистрации. Пожалуйста, проверьте введенные данные.');
      });
  };

  return (
    <div className="register">
      <Header showSearch={false} showAuthButtons={false} setSearch={() => null} />
      <main>
        <h2>Регистрация</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Имя"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ссылка на фото"
          value={formData.avatar}
          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
        />
        <button onClick={handleRegister}>Зарегистрироваться</button>
      </main>
    </div>
  );
};

export default Register;
