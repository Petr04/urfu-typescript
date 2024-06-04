import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setUser } from '../reducers/userReducer';
import { RootState } from '../store/store';
import { IUser } from './User';
import '../styles.css';

interface Props {
  search?: string;
  setSearch: (search: string) => void;
  showSearch: boolean;
  showAuthButtons: boolean;
}

const Header: React.FC<Props> = ({ search, setSearch, showSearch, showAuthButtons }) => {
  const token: string | null = useSelector((state: RootState) => state.user.token);
  const user: IUser | null = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate('/home');
  };

  return (
    <header className="header">
      <button className="home-button" onClick={() => navigate('/home')}>Главная</button>
      {showSearch && (
        <input
          type="text"
          placeholder="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      )}
      {showAuthButtons && (
        <div className="auth-buttons">
          {token ? (
            <>
              <Link to="/profile" className="profile-icon">
                <img src={user?.avatar || 'https://via.placeholder.com/50'} alt="Profile" />
              </Link>
              <button onClick={handleLogout}>Выход</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/register')}>Регистрация</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
